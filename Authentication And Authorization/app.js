const express = require("express");
const app = express();
const bcrypt = require("bcrypt");

app.get("/", function (req, res) {
  bcrypt.compare(
    "password",
    "$2b$10$i.V1CinUUCoL46YTASTNKe.gha.3iYdH/vbKNm.ZRVFqWwjOp3kbG",
    function (err, result) {
      console.log(result);
    },
  );
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
