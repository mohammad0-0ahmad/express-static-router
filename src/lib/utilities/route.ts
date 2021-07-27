import fs from "fs";
import path from "path";
import { ROUTE_FILE_EXTENSION } from "../constants.js";
import { HandlerType } from "./handler.js";
import { consoleErr } from "./logging.js";

/**
 *
 * @param root
 * @param prefix
 * @returns
 */
export const getAllRoutesPaths = (
  root: string,
  prefix: string
): Array<string> => {
  const result = [];
  fs.readdirSync(root, { withFileTypes: true }).forEach((dirent) => {
    if (dirent.isDirectory()) {
      result.push(
        ...getAllRoutesPaths(
          path.join(root, dirent.name),
          path.join(prefix, dirent.name)
        )
      );
    } else {
      if (dirent.name.match(ROUTE_FILE_EXTENSION)) {
        result.push(path.join(prefix, dirent.name));
      }
    }
  });
  return result;
};

/**
 *
 * @param path
 * @param paramsPattern
 * @returns
 */
export const routePathToRoute = (
  path: string,
  paramsPattern: string
): string => {
  try {
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
  } catch (error) {
    consoleErr(
      "Something went wrong while parsing route file name or paramsPattern."
    );
    return null;
  }
};

/* -------------------------------------------------------------------------- */
/*                                    Types                                   */
/* -------------------------------------------------------------------------- */

export type RouteModuleType = {
  [key in HttpRequestMethod | string]: HandlerType;
};

export type HttpRequestMethod =
  | "get"
  | "head"
  | "post"
  | "put"
  | "delete"
  | "connect"
  | "options"
  | "trace"
  | "patch";
