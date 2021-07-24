import fs from "fs";
import path from "path";
import { getHandlersEntries, HandlerEntryType } from "./lib/utilities/handler";
import { consoleErr } from "./lib/utilities/logging";
import { getMiddleware } from "./lib/utilities/middleware";
import { getAllRoutesPaths, routePathToRoute } from "./lib/utilities/route";

/**
 *
 * @param routerFolder
 * @param app
 */
const staticRouter = (routerFolder, app) => {
  const routerPath = path.join(path.resolve(), routerFolder);
  if (!fs.existsSync(routerPath)) {
    consoleErr(
      `Router folder couldn't be found at the following location:\n ${routerPath} `
    );
  } else {
    const routes = getAllRoutesPaths(routerPath, "/");
    routes.forEach(async (route) => {
      const routeModule = await import(path.join(routerPath, route));
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
