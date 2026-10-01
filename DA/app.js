const express = require("express");
const app = express();
app.get("/", function (req, res) {
  console.log("hey");
});
app.listen(3000);
