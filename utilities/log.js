const { name: packageName } = require("../package.json");

exports.consoleWarn = (...args) => {
  this.consoleLogHeader();
  console.log(fgYellow, "Warn! ", ...args, reset);
  this.consoleLogFooter();
};

exports.consoleErr = (...args) => {
  console.log(fgRed, "!Error! ", ...args, reset);
};

exports.consoleLogHeader = () => {
  console.log("\n");
  const spaces = "_".repeat(20);
  console.log(
    fgCyan,
    bgCyan,
    spaces,
    fgBlack,
    packageName,
    fgCyan,
    spaces,
    reset
  );
  console.log("\n");
};

exports.consoleLogFooter = () => {
  console.log("\n");
  console.log(fgBlack, bgCyan, "/".repeat(45 + packageName.length), reset);
};

const reset = "\x1b[0m";
const divider = "%s";
const fgBlack = "\x1b[30m";
const fgYellow = "\x1b[33m";
const fgRed = "\x1b[31m";
const fgCyan = "\x1b[36m";
const bgCyan = "\x1b[46m";
