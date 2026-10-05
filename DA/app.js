const express = require("express");
const path = require("path");
const userModel = require("./models/usermodel");
const postModel = require("./models/postmodel");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express(); // sabse pehle define karo
const JWT_SECRET = process.env.JWT_SECRET || "shhhh";
const crypto = require("crypto");
const multer = require("multer");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images/uploads");
  },
  filename: function (req, file, cb) {
    crypto.randomBytes(12, function (err, bytes) {
      const fn = bytes.toString("hex") + path.extname(file.originalname);
      cb(null, fn);
    });
  },
});

const upload = multer({ storage: storage });

function requireLogin(req, res, next) {
  const token = req.cookies.token;

  if (!token) return res.redirect("/login");

  try {
    req.auth = jwt.verify(token, JWT_SECRET);
    next();
  } catch (error) {
    res.clearCookie("token", { path: "/" });
    return res.redirect("/login");
  }
}

app.get("/", function (req, res) {
  res.render("index");
});
app.get("/login", function (req, res) {
  res.render("login");
});
app.get("/test", function (req, res) {
  res.render("test");
});
app.post("/upload", upload.single("image"), function (req, res) {
  console.log(req.file);
  res.send("Received");
});

app.post("/login", async function (req, res) {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) return res.redirect("/login");

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.redirect("/login");

    const token = jwt.sign({ email: user.email, userid: user._id }, JWT_SECRET);
    res.cookie("token", token, { httpOnly: true, sameSite: "lax" });
    res.redirect("/profile");
  } catch (error) {
    res.status(500).send("Unable to log in");
  }
});

app.post("/register", async function (req, res) {
  let { email, password, age, name, username } = req.body;
  let user = await userModel.findOne({ email });
  if (user) return res.send("user is already registered");
  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(password, salt, async function (err, hash) {
      let user = await userModel.create({
        username,
        name,
        email,
        password: hash,
        age,
      });
      let token = jwt.sign({ email: email, userid: user._id }, JWT_SECRET);
      res.cookie("token", token, { httpOnly: true, sameSite: "lax" });
      res.redirect("/profile");
    });
  });
});

app.get("/profile", requireLogin, async function (req, res) {
  try {
    const user = await userModel.findById(req.auth.userid).select("-password");

    if (!user) {
      res.clearCookie("token", { path: "/" });
      return res.redirect("/login");
    }

    console.log("Profile data:", user);
    return res.json(user);
  } catch (error) {
    return res.status(500).send("Unable to load profile");
  }
});

app.get("/logout", function (req, res) {
  res.clearCookie("token", { path: "/" });
  res.redirect("/login");
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
