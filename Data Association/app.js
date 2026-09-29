const express = require("express");
const path = require("path");

const userModel = require("./models/usermodel");
const postModel = require("./models/postmodel");

const app = express();

app.get("/", function (req, res) {
  res.send("hey welcome");
});
app.get("/create", async function (req, res) {
  let user = await userModel.create({
    username: "yasir",
    email: "myasirdev153@gmail.com",
    age: 23,
  });
  res.send(user);
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
