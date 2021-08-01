const { isItJohn } = require("../utilities");
const get = (req, res) => {
  res.send({
    firstName: req.params.firstName,
    lastName: req.params.lastName,
  });
};

module.exports = {
  get: {
    handler: get,
    paramsPattern: "/:firstName/:lastName",
    middleware: isItJohn,
  },
};
