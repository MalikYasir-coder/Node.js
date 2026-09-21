const express = require("express");
const app = express();
const userModel = require("./usermodel");

app.get("/", (req, res) => {
  res.send("Hello, World!");
});
app.get("/create", async (req, res) => {
  let user = await userModel.create({
    name: "malik abdullah",
    email: "mabdullah@app.com",
    password: "abdullah123",
  });
  res.send(user);
});
app.get("/update", async (req, res) => {
  let updateduser = await userModel.findOneAndUpdate(
    { name: "malik abdullah" },
    { name: "malikyasir" },
    { new: true },
  );
  res.send(updateduser);
});
app.get("/read", async (req, res) => {
  let readuser = await userModel.find();
  res.send(readuser);
});
app.get("/delete", async (req, res) => {
  let deleteuser = await userModel.findOneAndDelete({ name: "malik abdullah" });
  res.send(deleteuser);
});
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
