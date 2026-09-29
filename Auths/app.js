const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("./models/usermodel");
// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcrypt");

const app = express();

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());
app.get("/", function (req, res) {
  res.render("index");
});
app.post("/create", function (req, res) {
  let { username, email, password, age } = req.body;
  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(password, salt, async function (err, hash) {
      let createduser = await userModel.create({
        username,
        email,
        password: hash,
        age,
      });
      let token = jwt.sign({ email }, "shhhhhhh");
      res.cookie("token", token);
      res.send(createduser);
    });
  });
});
//   let createduser = await userModel.create({
//     username,
//     email,
//     password,
//     age,
//   });
//   res.send(createduser);
// });
app.get("/logout", function (req, res) {
  res.cookie("token", "");
  res.redirect("/");
});
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
