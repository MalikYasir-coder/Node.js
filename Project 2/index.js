const express = require("express");
const app = express();
const Path = require("path");
const fs = require("fs");

const filesPath = Path.join(__dirname, "files");

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(Path.join(__dirname, "public")));

app.get("/", async (req, res) => {
  try {
    const files = await fs.promises.readdir(filesPath);
    const tasks = await Promise.all(
      files.map(async (file) => ({
        title: file,
        body: await fs.promises.readFile(Path.join(filesPath, file), "utf8"),
      })),
    );

    res.render("index", { tasks });
  } catch (err) {
    console.error(err);
    res.status(500).send("Unable to load tasks.");
  }
});

app.get("/file/:filename", async (req, res) => {
  const filename = Path.basename(req.params.filename);

  try {
    const data = await fs.promises.readFile(
      Path.join(filesPath, filename),
      "utf8",
    );

    res.render("show", { filename, data });
  } catch (err) {
    res.status(404).send("File not found.");
  }
});

app.get("/edit/:filename", async (req, res) => {
  const filename = Path.basename(req.params.filename);

  try {
    const data = await fs.promises.readFile(
      Path.join(filesPath, filename),
      "utf8",
    );

    res.render("edit", { filename, data });
  } catch (err) {
    res.status(404).send("File not found.");
  }
});

app.post("/edit/:filename", async (req, res) => {
  const oldFilename = Path.basename(req.params.filename);
  const newFilename = Path.basename(String(req.body.title || "").trim());
  const body = String(req.body.body || "");

  if (!newFilename || !body) {
    return res.status(400).send("Title and description are required.");
  }

  const oldPath = Path.join(filesPath, oldFilename);
  const newPath = Path.join(filesPath, newFilename);

  try {
    await fs.promises.writeFile(newPath, body, "utf8");

    if (oldFilename !== newFilename) {
      await fs.promises.unlink(oldPath);
    }

    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating task.");
  }
});

app.post("/create", async (req, res) => {
  const title = Path.basename(String(req.body.title || "").trim());
  const body = String(req.body.body || "");

  if (!title || !body) {
    return res.status(400).send("Title and description are required.");
  }

  try {
    await fs.promises.writeFile(Path.join(filesPath, title), body, "utf8");
    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error creating file.");
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
