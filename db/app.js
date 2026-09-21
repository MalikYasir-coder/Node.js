const express = require("express");
const app = express();
const userModel = require("./usermodel");

app.get("/", (req, res) => {
  res.send("Hello, World!");
});
app.get("/create", async (req, res) => {
  let user = await userModel.create({
    name: "muhammad yasir",
    email: "myasirdev135@app.com",
    password: "password123",
  });
  res.send(user);
});
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
