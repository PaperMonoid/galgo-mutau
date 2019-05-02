const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const port = 8080;

const app = express();

app.disable("x-powered-by");
app.use(bodyParser.json());
app.use(cors());

app.get("/ping", function(req, res) {
  res.status(200).send("pong");
});

app.post("/api/v0/groups", function(req, res) {
  if (req.body.tos) {
    res.setHeader("Content-Type", "application/json");
    res.send({
      token: jwt.sign({ collection: false }, process.env["SECRET"], {
        expiresIn: "1h"
      }),
      groups: []
    });
  } else {
    res.setHeader("Content-Type", "application/json");
    res.status(400).send({ message: "User must agree with terms of service." });
  }
});

const groups = require("./routes/groups");
app.use("/api/v1/groups", groups);

app.listen(port, () =>
  console.log(`Galgo MuTau server listening on port ${port}!`)
);
