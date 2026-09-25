const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
app.get("/", function (req, res) {
  bcrypt.genSalt(10, function (err, salt) {
    bycrypt.hash("pololololo", salt, function (err, hash) {});
  });
});

app.listen(3000);
