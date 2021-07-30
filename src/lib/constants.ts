/**
 *
 */
export const PACKAGE_NAME = "express-static-router";

/**
 *
 */
export const ROUTE_FILE_EXTENSION = /\.[0-9a-z]+$/;

/**
 *
 */
export const WILD_ROUTE = /\[\.\.\.\]$/;

/**
 *
 */
export const HTTP_REQUEST_METHOD =
  /^(get|head|post|put|delete|connect|options|trace|patch)$/;

/**
 *
 */
export const defaultOptions = {
  printDetectedRoutes: true,
};

/**
 *
 */
export type OptionsType = {
  printDetectedRoutes?: boolean;
};
