const express = require("express");
const app = express();
const path = require("node:path");
var bodyParser = require("body-parser");
const multer = require("multer");

app.use(bodyParser.urlencoded({ extended: true }));

const upload = multer({
  fileFilter: (req, file, cb) => {
    if (req.body.password == process.env.PASSWORD) {
      if (file.mimetype == "image/png" || file.mimetype == "image/jpeg") {
        // TODO: check for magic number as well
        cb(null, true);
      } else cb(new Error("Invalid file type"));
    } else {
      // cb(null, false);
      cb(new Error("Incorrect password"));
    }
  },
  storage: multer.diskStorage({
    destination: "./uploads",
    // filename: () => {

    // }
  })
});



app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./index.html"));
})

app.post("/generate", upload.single("image"), (req, res) => {
  // TODO: handle errors more elegantly
  console.log(req.body, req.file)
  res.send("received");
})

app.listen((process.env.PORT || 8000), () => {
  console.log("app listening");
})

// fileupload
// integrate
// deploy to heroku