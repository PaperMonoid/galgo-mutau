const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");

const secret = process.env["SECRET"];
const app = express();
const port = 3000;

app.use(bodyParser.json());

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
