const express = require("express");
const staticRouter = require("express-static-router");

const PORT = process.env.PORT || 3001;
const app = express();
staticRouter("./router", app);

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
