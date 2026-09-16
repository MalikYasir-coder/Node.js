// const fs = require("fs");
// fs.unlink("New File", function (err) {
//   if (err) console.log(err);
//   else console.log("File deleted successfully");
// });
// const http = require("http");
// const server = http.createServer((req, res) => {
//   res.end("Hello World");
// });
// server.listen(3000);
// const express = require("express");
// const app = express();
// Creating Routes
// app.get("/", (req, res) => {
//   res.send("Home Page");
// });
// app.get("/about", (req, res) => {
//   res.send("About Page");
// });
// app.get("/contact", (req, res) => {
//   res.send("Contact Page");
// });
const express = require("express");
const app = express();
app.use(function (req, res, next) {
  console.log("User is signed in");
  next();
});
app.use(function (req, res, next) {
  console.log("User is signed on");
  next();
});
app.get("/", (req, res) => {
  res.send("Home Page");
});
app.get("/about", (req, res, next) => {
  return next(new Error("Something went wrong!"));
});
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});
app.listen(3000);
