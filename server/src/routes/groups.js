const express = require("express");
const jwt = require("jsonwebtoken");
const groups = require("../models/groups");

const secret = process.env["SECRET"];

const router = express.Router();

router.post("/", function(req, res) {
  if (req.body.tos) {
    console.log(JSON.stringify(req.body));
    groups
      .all(req.body.control, req.body.password)
      .then(groups => {
        console.log(JSON.stringify(groups));
        res.setHeader("Content-Type", "application/json");
        res.send({
          token: jwt.sign({ payload: "foo" }, secret),
          groups: groups
        });
      })
      .catch(error => {
        res.setHeader("Content-Type", "application/json");
        res.status(401).send({ message: "Invalid credentials." });
      });
  } else {
    res.setHeader("Content-Type", "application/json");
    res.status(400).send({ message: "User must agree with terms of service." });
  }
});

module.exports = router;
