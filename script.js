const fs = require("fs");
fs.unlink("New File", function (err) {
  if (err) console.log(err);
  else console.log("File deleted successfully");
});
