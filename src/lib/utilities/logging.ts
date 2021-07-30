import { PACKAGE_NAME } from "../constants.js";

/**
 *
 * @param args
 */
export const consoleWarn = (...args: any): void => {
  consoleLogHeader();
  console.log(fgYellow, "Warn!\n", ...args, reset);
  consoleLogFooter();
};

/**
 *
 * @param args
 */
export const consoleErr = (...args: any) => {
  consoleLogHeader();
  console.log(fgRed, "Error!!\n", ...args, reset);
  consoleLogFooter();
};

/**
 *
 */
const consoleLogHeader = (): void => {
  console.log("\n");
  const spaces = "_".repeat(20);
  console.log(
    fgBrightGreen,
    bgBrightGreen,
    spaces,
    fgBlack,
    PACKAGE_NAME,
    fgBrightGreen,
    spaces,
    bgBlack,
    fgTransparent,
    "-",
    reset
  );
  console.log("\n");
};

/**
 *
 */
const consoleLogFooter = (): void => {
  console.log("\n");
  console.log(
    fgBlack,
    bgBrightGreen,
    "/".repeat(45 + PACKAGE_NAME.length),
    bgBlack,
    fgTransparent,
    "-",
    reset
  );
};

export const consoleDetectedRoutes = (detectedRoutes: object) => {
  consoleLogHeader();
  console.log(fgCyan, underLine, "Detected routes:", reset);
  Object.entries(detectedRoutes).map(([route, methods]) => {
    console.log(`\n`);
    console.log(fgBrightGreen, route, reset);
    let methodsLine = [];
    methods.forEach((method) => {
      methodsLine.push(
        [
          fgBlack,
          requestMethodsColors[method],
          " ",
          method,
          " ",
          bgBlack,
          fgTransparent,
          "-",
          reset,
        ].join("")
      );
    });
    console.log(methodsLine.join(""));
  });
  consoleLogFooter();
};

const reset = "\x1b[0m";
const underLine = "\x1b[4m";
const fgTransparent = "\x1b[8m";
const fgBlack = "\x1b[30m";
const bgBlack = "\x1b[40m";
const fgCyan = "\x1b[36m";
const fgYellow = "\x1b[33m";
const fgRed = "\x1b[31m";
const fgBrightGreen = "\x1b[92m";
const bgBrightGreen = "\x1b[102m";
const bgBlue = "\x1b[44m";
const bgBrightBlue = "\x1b[104m";
const bgYellow = "\x1b[43m";
const bgBrightYellow = "\x1b[103m";
const bgRed = "\x1b[41m";
const bgGreen = "\x1b[42m";
const bgBrightRed = "\x1b[101m";
const bgMagenta = "\x1b[45m";
const bgBrightMagenta = "\x1b[105m";

const requestMethodsColors = {
  get: bgBlue,
  head: bgBrightBlue,
  post: bgYellow,
  put: bgBrightYellow,
  delete: bgRed,
  connect: bgGreen,
  options: bgBrightRed,
  trace: bgMagenta,
  patch: bgBrightMagenta,
};
