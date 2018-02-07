const fs = require('fs');
const tmp = require('tmp');
const fr = require('face-recognition');
const gm = require('gm').subClass({ imageMagick: true });

function createRectangles(imgPath) {
  const image = fr.loadImage(imgPath);
  const detector = fr.FaceDetector();
  const faceRectangles = detector.locateFaces(image);

  console.log('rectangles created');
  return faceRectangles;
}

function getBuffer(buffer, scale = 1) {
  const tmpobj = tmp.fileSync({ prefix: 'face-', postfix: '.jpg' });
  const tmpName = tmpobj.name;
  const bufferArray = [];

  fs.writeFile(tmpName, buffer, 'binary', err => {
    if (err) console.log(err);

    const faceRectangles = createRectangles(tmpName);

    faceRectangles.forEach((fc, i) => {
      const { rect } = fc || {};
      const { bottom, top, right, left } = rect || {};

      const width = (right - left) * scale;
      const height = (bottom - top) * scale;
      const x = left;
      const y = top;

      gm(buffer).crop(width, height, x, y).write(`./images/face${i + 1}.jpg`, function (err) {
        if (err) console.log(err);
      });

      gm(buffer).crop(width, height, x, y).toBuffer('JPG', function (err, buffer) {
        if (err) console.log(err);
      });
    });

    fs.unlink(tmpName, err => {
      if (err) console.log(err);
      console.log('file deleted');
    });
  });
}

module.exports = getBuffer;