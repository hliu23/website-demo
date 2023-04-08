const express = require("express");
const app = express();
const path = require("node:path");
var bodyParser = require("body-parser");
const multer = require("multer");
const generate = require("./generate.js");

SOURCE_PATH = "./tmp/uploads";
OUTPUT_PATH = "./tmp/converted";

app.use(bodyParser.urlencoded({ extended: true }));

const upload = multer({
  fileFilter: (req, file, cb) => {
    if (req.body.password == process.env.CUSTOM_PASSWORD) {
      if (file.mimetype == "image/png" || file.mimetype == "image/jpeg") {
        // TODO: check for magic number as well
        cb(null, true);
      } else cb(null, false);
      // cb(new Error("Invalid file type"));
    } else {
      cb(null, false);
      // cb(new Error("Incorrect password"));
    }
  },
  storage: multer.diskStorage({
    destination: SOURCE_PATH,
    filename: (req, file, cb) => {
      cb(null, "file_" + Math.round(Math.random() * 1E9) + "_" + file.originalname);
    }
  })
});



app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./index.html"));
})

app.post("/generate", upload.single("image"), (req, res) => {
  if (!req.file) {
    res.send("Upload rejected");
  } else {
    const newPath = path.join(OUTPUT_PATH, "converted_" + req.file.filename);
    generate(req.file.path, newPath)
    .then((result) => {
      res.sendFile(path.join(__dirname, newPath));
    })
    .catch((err) => {
      console.error(err);
    })
  }
})

app.listen((process.env.PORT || 8000), () => {})
