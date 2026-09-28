const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
app.use(cookieParser());

const secret = "mySecretKey";

app.get("/", function (req, res) {
  const token = jwt.sign({ email: "yasirdev@gmail.com" }, secret);
  res.cookie("token", token);
  res.send("done");
});
app.get("/read", function (req, res) {
  let data = jwt.verify(req.cookies.token, secret);
  console.log(data);
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
