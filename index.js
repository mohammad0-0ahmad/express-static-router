const getAllRoutes = require("./utilities/getAllRoutesPath");
const path = require("path");
const {
  routePathToRoute,
  getHandlersEntries,
  getMiddleware,
} = require("./utilities");
const root = path.dirname(require.main.filename);

/**
 *
 * @param {*} routerPath
 * @param {*} app
 */
const staticRouter = (routerPath, app) => {
  let routes = getAllRoutes(path.join(root, routerPath), "/");
  routes.forEach((route) => {
    const routeModule = require(path.join(root, routerPath, route));
    getHandlersEntries(routeModule, route).forEach(([method, handler]) => {
      app[method](
        routePathToRoute(route, handler?.paramsPattern),
        getMiddleware(handler?.middleware),
        (req, res) => (handler?.handler || handler)(req, res)
      );
    });
  });
};

module.exports = staticRouter;
