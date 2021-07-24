/**
 *
 * @param middleware
 * @returns
 */
export const getMiddleware = (
  middleware: MiddlewareType | undefined
): MiddlewareType => {
  return typeof middleware === "function"
    ? middleware
    : (_, __, next) => {
        next();
      };
};

/* -------------------------------------------------------------------------- */
/*                                    Types                                   */
/* -------------------------------------------------------------------------- */

export type MiddlewareType = (request, response, next) => void;
