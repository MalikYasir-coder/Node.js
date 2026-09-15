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
const express = require("express");
const app = express();
// Creating Routes
app.get("/", (req, res) => {
  res.send("Home Page");
});
app.get("/about", (req, res) => {
  res.send("About Page");
});
app.get("/contact", (req, res) => {
  res.send("Contact Page");
});
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
