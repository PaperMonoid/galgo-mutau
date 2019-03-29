const express = require("express");
const bodyParser = require("body-parser");

const port = 8080;

const app = express();
app.disable("x-powered-by");
app.use(bodyParser.json());

app.get("/ping", function(req, res) {
  res.status(200).send("pong");
});

const groups = require("./routes/groups");
app.use("/api/v1/groups", groups);

app.listen(port, () =>
  console.log(`Galgo MuTau server listening on port ${port}!`)
);
