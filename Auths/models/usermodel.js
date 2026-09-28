const { name } = require("ejs");
const mongoose = require("mongoose");
mongoose.connect(`mongodb://127.0.0.1:27017/AuthTestApp`);
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  age: Number,
});
module.exports = mongoosemodel("user", userSchema);
