export const isItJohn = (req, res, next) => {
  if (req.params.firstName.toLowerCase() === "john") {
    next();
  } else {
    res.send("Sorry you aren't John");
  }
};
