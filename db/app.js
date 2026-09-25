const express = require("express");
const app = express();
const path = require("path");
const userModel = require("./models/usermodel");
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index");
});
app.post("/create", async (req, res) => {
  let { name, email, image } = req.body;
  let createduser = await userModel.create({
    name,
    email,
    image,
  });
  res.redirect("/read");
});
app.get("/read", async (req, res) => {
  let users = await userModel.find({});
  res.render("read", { users });
});
app.get("/delete/:id", async (req, res) => {
  let { id } = req.params;
  await userModel.findByIdAndDelete(id);
  res.redirect("/read");
});
app.get("/edit/:id", async (req, res) => {
  let { id } = req.params;
  let user = await userModel.findById(id);
  res.render("edit", { user });
});
app.post("/update/:id", async (req, res) => {
  let { id } = req.params;
  let { name, email, image } = req.body;
  await userModel.findByIdAndUpdate(id, { name, email, image });
  res.redirect("/read");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
