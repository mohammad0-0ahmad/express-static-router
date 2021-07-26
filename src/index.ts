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
    const routes = getAllRoutesPaths(routerPath, "/");
    routes.forEach(async (route) => {
      let routeModule;
      try {
        routeModule = await import(path.join(routerPath, route));
      } catch (error) {
        try {
          routeModule = await import(
            `../../../../${path.join(routerFolder, route)}`
          );
        } catch (error) {
          consoleErr(
            `Something went wrong while loading the following route:\n ${path.join(
              routerFolder,
              route
            )}\n Please double check the mentioned route.`
          );
        }
      }
      routeModule &&
        getHandlersEntries(routeModule, route).forEach(
          ([method, handler]: HandlerEntryType) => {
            const handlerToCall =
              typeof handler === "object" ? handler?.handler : handler;
            app[method](
              routePathToRoute(
                route,
                typeof handler === "object" && handler?.paramsPattern
              ),
              getMiddleware(typeof handler === "object" && handler?.middleware),
              (req, res) => handlerToCall(req, res)
            );
          }
        );
    });
  }
};

export default staticRouter;
