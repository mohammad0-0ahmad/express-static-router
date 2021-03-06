import { Application as ExpressApplication } from "express-serve-static-core";
import fs from "fs";
import path from "path";
import {
  getHandlersEntries,
  HandlerEntryType,
  RequestType,
  ResponseType,
} from "./lib/utilities/handler.js";
import { consoleDetectedRoutes, consoleErr } from "./lib/utilities/logging.js";
import { getMiddleware } from "./lib/utilities/middleware.js";
import { getAllRoutesPaths, routePathToRoute } from "./lib/utilities/route.js";
import { defaultOptions, OptionsType } from "./lib/constants.js";
import { BasicRouteModuleType } from "./lib/utilities/route.js";

/**
 *
 * @param routerFolder
 * @param app
 * @param options
 */
const staticRouter: StaticRouterType = (routerFolder, app, options) => {
  options = { ...defaultOptions, ...options };
  const routerPath = path.join(path.resolve(), routerFolder);
  if (!fs.existsSync(routerPath)) {
    consoleErr(
      `Router folder couldn't be found in the following location:\n ${routerPath} `
    );
  } else {
    const detectedRoutes = {};
    const routesPaths = getAllRoutesPaths(routerPath, "/");
    routesPaths.forEach(async (routePath, routePathIndex) => {
      let routeModule;
      let errorDetails = "";
      try {
        routeModule = await import(path.join(routerPath, routePath));
      } catch (error) {
        if (error.toString()?.includes("SyntaxError")) {
          errorDetails = error;
        }
        try {
          routeModule = await import(
            "file:///" + path.join(routerPath, routePath)
          );
        } catch (error) {
          if (error.toString()?.includes("SyntaxError")) {
            errorDetails = error;
          }
          consoleErr(
            `Something went wrong while loading the following route:\n ${path.join(
              routerFolder,
              routePath
            )}\n Please double check the mentioned route.`
          );
          errorDetails && console.log(errorDetails);
        }
      }
      routeModule &&
        getHandlersEntries(routeModule, routePath).forEach(
          ([method, handler]: HandlerEntryType) => {
            const handlerToCall =
              typeof handler === "object" ? handler?.handler : handler;
            const route = routePathToRoute(
              routePath,
              typeof handler === "object" && handler?.paramsPattern
            );
            route &&
              app[method](
                route,
                getMiddleware(
                  typeof handler === "object" && handler?.middleware
                ),
                (req: RequestType, res: ResponseType) => handlerToCall(req, res)
              );
            //Prepare detectedRoutes.
            if (options.printDetectedRoutes) {
              if (!detectedRoutes[route]) {
                detectedRoutes[route] = [];
              }
              detectedRoutes[route].push(method);
            }
          }
        );
      //Print detectedRoutes.
      if (
        options.printDetectedRoutes &&
        routesPaths.length - 1 === routePathIndex &&
        Object.keys(detectedRoutes).length
      ) {
        consoleDetectedRoutes(detectedRoutes);
      }
      // Call onLoad callback.
      if (options.onLoad && routesPaths.length - 1 === routePathIndex) {
        options.onLoad();
      }
    });
    // Call onLoad callback if no routes were found.
    if (!routesPaths.length && options.onLoad) {
      options.onLoad();
    }
  }
};

export default staticRouter;
(() => {
  try {
    module.exports = staticRouter;
  } catch (err) {}
})();

/* -------------------------------------------------------------------------- */
/*                                    Types                                   */
/* -------------------------------------------------------------------------- */

/**
 *
 */
export type StaticRouterType = (
  routerFolder: string,
  app: ExpressApplication,
  options?: OptionsType
) => void;

/**
 *
 */
export { HandlerType } from "./lib/utilities/handler.js";

/**
 *
 */
export type RouteModuleType = BasicRouteModuleType;
