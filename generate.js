const jimp = require("jimp");
const sizeOf = require("image-size");

function generate(SOURCE_PATH, OUTPUT_PATH) {
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

}

module.exports = {
  generate
}