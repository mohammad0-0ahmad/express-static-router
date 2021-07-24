import { MiddlewareType } from "./middleware";
import { RouteModuleType } from "./route";
import { consoleWarn } from "./logging";
import { HTTP_REQUEST_METHOD } from "../constants";

/**
 *
 * @param module
 * @param route
 * @returns
 */
export const getHandlersEntries = (
  module: RouteModuleType,
  route: string
): Array<HandlerEntryType> => {
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

/* -------------------------------------------------------------------------- */
/*                                    Types                                   */
/* -------------------------------------------------------------------------- */

export type BasicHandlerType = (request, response) => void;

export type CompoundHandlerType = {
  paramsPattern?: string;
  middleware?: MiddlewareType;
  handler: BasicHandlerType;
};

export type HandlerType = CompoundHandlerType | BasicHandlerType;

export type HandlerEntryType = [keyof RouteModuleType, HandlerType];
