const multer = require("multer");
// diskstorage setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images/uploads");
  },
  filename: function (req, file, cb) {
    crypto.randomBytes(12, function (err, bytes) {
      if (err) return cb(err);
      cb(null, file.fieldname + "-" + raw.toString("hex"));
    });
  },
});

const upload = multer({ storage: storage });

//  export upload variable create
