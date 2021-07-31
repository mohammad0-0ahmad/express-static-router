import QueryString from "qs";
import { Request, Response } from "express-serve-static-core";
import { MiddlewareType } from "./middleware.js";
import { RouteModuleType, BasicRouteModuleType } from "./route.js";
import { consoleWarn } from "./logging.js";
import { HTTP_REQUEST_METHOD } from "../constants.js";

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
  const moduleWithoutDefault = Object.fromEntries(
    Object.entries(module).filter(([key, value]) => key !== "default")
  );
  const defaultObj = { ...(module?.default?.default || module?.default) };
  const activeModule: BasicRouteModuleType = {
    ...moduleWithoutDefault,
    ...defaultObj,
  };
  const handlersEntries = Object.entries(activeModule).filter(
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

export type BasicHandlerType = (
  request: RequestType,
  response: ResponseType
) => void;

export type CompoundHandlerType = {
  paramsPattern?: string;
  middleware?: MiddlewareType;
  handler: BasicHandlerType;
};

export type HandlerType = CompoundHandlerType | BasicHandlerType;

export type HandlerEntryType = [keyof RouteModuleType, HandlerType];

export type RequestType = Request<
  {},
  any,
  any,
  QueryString.ParsedQs,
  Record<string, any>
>;

export type ResponseType = Response<any, Record<string, any>, number>;
