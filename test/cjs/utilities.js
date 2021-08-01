exports.isItJohn = (req, res, next) => {
  console.log(req.params);
  if (req.params.firstName.toLowerCase() === "john") {
    next();
  } else {
    res.send("Sorry you aren't John");
  }
};
