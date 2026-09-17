const express = require("express");
const app = express();
const Path = require("path");
const fs = require("fs");
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(Path.join(__dirname, "public")));

app.get("/", (req, res) => {
  fs.readdir(Path.join(__dirname, "files"), function (err, files) {
    if (err) {
      return res.status(500).send("Unable to load tasks.");
    }

    Promise.all(
      files.map((file) =>
        fs.promises
          .readFile(Path.join(__dirname, "files", file), "utf8")
          .then((body) => ({ title: file, body })),
      ),
    )
      .then((tasks) => res.render("index", { tasks }))
      .catch(() => res.status(500).send("Unable to load task details."));
  });
});
app.get("/file/:filename", function (req, res) {
  const filename = req.params.filename;
  fs.readFile(
    Path.join(__dirname, "files", filename),
    "utf8",
    function (err, data) {
      if (err) {
        return res.status(404).send("File not found");
      }
      res.render("show", { filename, data });
    },
  );
});
app.post("/create", function (req, res) {
  fs.writeFile("./files/" + req.body.title, req.body.body, function (err) {
    if (err) {
      console.log(err);
      res.status(500).send("Error creating file");
    } else {
      res.redirect("/");
    }
  });
});
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
