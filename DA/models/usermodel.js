const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/propertesting");
//   .catch((error) => console.error("MongoDB connection error:", error.message));

const userSchema = new mongoose.Schema({
  username: String,
  name: String,
  age: Number,
  email: String,
  password: String,
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "post",
    },
  ],
});
module.exports = mongoose.model("user", userSchema);
