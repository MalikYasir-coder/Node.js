const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/mydatabase");
// create a schema for the user model
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});
module.exports = mongoose.model("User", userSchema);
