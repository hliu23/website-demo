const jimp = require("jimp");
const sizeOf = require("image-size");

function generate(SOURCE_PATH, OUTPUT_PATH) {
  const percent = 30 * 0.01;
  dimensions = sizeOf(SOURCE_PATH);

  return jimp.read(SOURCE_PATH)
  .then((img) => {
    return img
    .crop(0, dimensions.height * (1-percent), dimensions.width, dimensions.height * percent)
  })
  .then((colorImg) => {
    return Promise.all([colorImg, jimp.read(SOURCE_PATH)])
  })
  .then(([colorImg, fullColorImg]) => {
    return fullColorImg.grayscale()
    .composite(colorImg, 0, dimensions.height * (1-percent))
    .writeAsync(OUTPUT_PATH);
  })
  .catch((err) => {
    console.error(err);
  })

}

module.exports = generate;