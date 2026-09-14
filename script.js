// const fs = require("fs");
// fs.unlink("New File", function (err) {
//   if (err) console.log(err);
//   else console.log("File deleted successfully");
// });
const http = require("http");
const server = http.createServer((req, res) => {
  res.end("Hello World");
});
server.listen(3000);
