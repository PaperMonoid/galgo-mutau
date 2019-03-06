const express = require("express");
const app = express();
const port = 3000;

app.use("/", express.static("public"));
app.use("/media", express.static("media"));
app.use("/react", express.static("node_modules/react"));
app.use("/react-dom", express.static("node_modules/react-dom"));
app.use("/", express.static("dist"));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
