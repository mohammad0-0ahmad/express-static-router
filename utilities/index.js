const { ROUTE_FILE_EXTENSION, HTTP_REQUEST_METHOD } = require("../constants");
const { consoleWarn } = require("./log");

/**
 *
 * @param {*} path
 * @param {*} paramsPattern
 * @returns
 */
exports.routePathToRoute = (path, paramsPattern) => {
  return [
    path
      .replace(ROUTE_FILE_EXTENSION, "")
      .replace(/\\index$/, "")
      .replace(/\\/g, "/")
      .replace(/\[\.\.\.\]$/, "*"),
    paramsPattern || "",
  ]
    .join("")
    .replace(/^$/, "/");
};

exports.getHandlersEntries = (module, route) => {
  const handlersEntries = Object.entries(module).filter(
    ([exportedVariableName, exportedVariableValue]) => {
      if (exportedVariableName.match(HTTP_REQUEST_METHOD)) {
        if (
          typeof exportedVariableValue === "function" ||
          (typeof exportedVariableValue === "object" &&
            exportedVariableValue?.handler)
        ) {
          return true;
        }
      }
      return false;
    }
  );
  if (!handlersEntries.length) {
    consoleWarn(
      "The following route file doesn't export any http request handler:\n",
      route
    );
  }

  return handlersEntries;
};

exports.getMiddleware = (middleware) => {
  return typeof middleware === "function"
    ? middleware
    : (_, __, next) => {
        next();
      };
};
