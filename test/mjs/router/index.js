import { isItJohn } from "../utilities.js";

export const get = (req, res) => {
  res.send({
    firstName: req.params.firstName,
    lastName: req.params.lastName,
  });
};

export default {
  get: {
    handler: get,
    paramsPattern: "/:firstName/:lastName",
    middleware: isItJohn,
  },
};
