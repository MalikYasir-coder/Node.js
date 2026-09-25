const express = require("express");
// const cookie = require("cookie-parser")
const app = express();
app.get("/", (req, res) => {
  res.send("Malik Yasir");
  //   res.send("Cookie has been set");
});
app.get("/read", (req, res) => {
  // console.log(req.cookie)
  //   res.cookie("name", "Malik Yasir");
  res.send("Cookie has been read");
});
app.listen(3000);
