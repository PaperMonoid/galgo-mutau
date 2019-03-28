var express = require("express");
var router = express.Router();

router.post("/login", function(req, res) {
  if (req.body.tos) {
    res.send(jwt.sign({ payload: "yay" }, secret));
  } else {
    res.status(401).send("Invalid credentials");
  }
});

module.exports = router;
