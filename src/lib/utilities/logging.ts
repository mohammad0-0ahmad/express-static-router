const packageName = "express-static-router";

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
    packageName,
    fgBrightGreen,
    spaces,
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
    "/".repeat(45 + packageName.length),
    reset
  );
};

const reset = "\x1b[0m";
const divider = "%s";
const fgBlack = "\x1b[30m";
const fgYellow = "\x1b[33m";
const fgRed = "\x1b[31m";
const fgBrightGreen = "\x1b[92m";
const bgBrightGreen = "\x1b[102m";
