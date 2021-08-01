import express from "express";
import staticRouter from "express-static-router";

const PORT = process.env.PORT || 3002;
const app = express();

staticRouter("./router", app, {
  onLoad: () => {
    app.use((req, res) => {
      res.status(404).send();
    });
  },
});

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
