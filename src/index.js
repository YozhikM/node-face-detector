/* @flow */

const fs = require('fs');
const fr = require('face-recognition');
const gm = require('gm').subClass({ imageMagick: true });

const imgPath = './images/many-faces.jpg';

const buffer = require('fs').readFileSync(imgPath);

const imgStream = fs.createReadStream(imgPath);
const image = fr.loadImage(imgPath);

const detector = fr.FaceDetector();
const faceRectangles = detector.locateFaces(image);

const bufferArray = [];

faceRectangles.forEach(async (fc, i) => {
  const { rect } = fc || {};
  const { bottom, top, right, left } = rect || {};

  const width = right - left;
  const height = bottom - top;
  const x = left;
  const y = top;
  await gm(imgStream)
    .crop(width, height, x, y)
    .write(`./images/face${i + 1}.jpg`, function(err) {
      if (!err) console.log('done');
    });

  await gm(imgStream)
    .crop(width, height, x, y)
    .toBuffer('JPG', function(err, buffer) {
      if (err) return handle(err);
      bufferArray.push({ i, buffer });
    });
});

console.log('bufferArray: ', bufferArray);
