const fs = require("fs");
const path = require("path");
const { ROUTE_FILE_EXTENSION } = require("../constants");

/**
 *
 * @param {*} root
 * @param {*} prefix
 * @returns
 */
const getAllRoutes = (root, prefix) => {
  const result = [];
  fs.readdirSync(root, { withFileTypes: true }).forEach((dirent) => {
    if (dirent.isDirectory()) {
      result.push(
        ...getAllRoutes(
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

module.exports = getAllRoutes;
