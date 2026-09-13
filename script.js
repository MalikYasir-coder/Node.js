const fs = require("fs");
fs.rename("Hello File", "New File", function (err) {
  if (err) console.log(err);
  else console.log("File renamed successfully");
});
