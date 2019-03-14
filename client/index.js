const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");

const secret = "wow such secure";
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use("/", express.static("public"));
app.use("/media", express.static("media"));
app.use("/react", express.static("node_modules/react"));
app.use("/react-dom", express.static("node_modules/react-dom"));
app.use("/", express.static("dist"));

app.post("/api/v1/login", function(req, res) {
  console.log(req.body);
  if (
    req.body.tos &&
    req.body.controlNumber == "1234" &&
    req.body.password == "1234"
  ) {
    res.send(jwt.sign({ payload: "yay" }, secret));
  } else {
    res.status(401).send("Unauthorized");
  }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
