const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");

const secret = process.env["SECRET"];
const port = 8080;

const app = express();
app.disable("x-powered-by");
app.use(bodyParser.json());

app.get("/ping", function(req, res) {
  res.status(200).send("pong");
});

const users = require("./routes/users");
app.use("/users", users);

app.listen(port, () =>
  console.log(`Galgo MuTau server listening on port ${port}!`)
);
