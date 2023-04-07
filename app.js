const express = require("express");
const app = express();
const path = require("node:path");
const jimp = require("jimp");
const sizeOf = require("image-size");
var bodyParser = require("body-parser");
const multer = require("multer")
const upload = multer({
  storage: multer.diskStorage({

  })
});


// check filetype and password

app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./index.html"));
})

app.post("/generate", upload.single("image"), (req, res) => {
  console.log(req.body, req.file);
})

app.listen((process.env.PORT || 8000), () => {
  console.log("app listening");
})
// colored
SOURCE_PATH = "./tests/source.jpeg";
OUTPUT_PATH = "./tests/output.jpeg";

const percent = 30 * 0.01;
dimensions = sizeOf(SOURCE_PATH);

jimp.read(SOURCE_PATH)
.then((img) => {
  return img
  .crop(0, dimensions.height * (1-percent), dimensions.width, dimensions.height * percent)
})
.then((colorImg) => {
  return Promise.all([colorImg, jimp.read(SOURCE_PATH)])
})
.then(([colorImg, fullColorImg]) => {
  const grayscaleImg = fullColorImg.grayscale()
  return grayscaleImg
  .composite(colorImg, 0, dimensions.height * (1-percent))
  .write(OUTPUT_PATH);
})
.catch((err) => {
  console.error(err);
})

