const express = require("express");
const app = express();
const bcrypt = require("bcrypt");

app.get("/", function (req, res) {
  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash("password", salt, function (err, hash) {
      console.log(hash); // yahan use karo, jahan "hash" available hai
      res.send(hash); // response bhi yahin se bhejo
    });
  });
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
