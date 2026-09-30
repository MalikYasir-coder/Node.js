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
app.get("/post/create", async function (req, res) {
  let post = await postModel.create({
    postdata: "My Data Is In PostData",
    user: "6abd3876500d5e22006a4156",
  });

  let user = await userModel.findOne({ _id: "6abd3876500d5e22006a4156" });

  if (!user) {
    return res.send("User nahi mila, ID check karo");
  }

  user.posts.push(post._id);
  await user.save();
  res.send({ post, user });
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
