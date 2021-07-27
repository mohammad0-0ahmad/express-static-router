import fs from "fs";
import path from "path";
import {
  getHandlersEntries,
  HandlerEntryType,
} from "./lib/utilities/handler.js";
import { consoleErr } from "./lib/utilities/logging.js";
import { getMiddleware } from "./lib/utilities/middleware.js";
import { getAllRoutesPaths, routePathToRoute } from "./lib/utilities/route.js";

/**
 *
 * @param routerFolder
 * @param app
 */
const staticRouter = (routerFolder: string, app): void => {
  const routerPath = path.join(path.resolve(), routerFolder);
  if (!fs.existsSync(routerPath)) {
    consoleErr(
      `Router folder couldn't be found in the following location:\n ${routerPath} `
    );
  } else {
    getAllRoutesPaths(routerPath, "/").forEach(async (routePath) => {
      let routeModule;
      try {
        routeModule = await import(path.join(routerPath, routePath));
      } catch (error) {
        try {
          routeModule = await import(
            `../../../../${path.join(routerFolder, routePath)}`
          );
        } catch (error) {
          consoleErr(
            `Something went wrong while loading the following route:\n ${path.join(
              routerFolder,
              routePath
            )}\n Please double check the mentioned route.`
          );
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
                (req, res) => handlerToCall(req, res)
              );
          }
        );
    });
  }
};

export default staticRouter;
