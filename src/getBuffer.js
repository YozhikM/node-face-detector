/* @flow */

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

// $FlowFixMe
function getBuffer(buffer, scale = 1) {
  const tmpobj = tmp.fileSync({ postfix: '.jpg' });
  const tmpName = tmpobj.name;

  fs.writeFile(tmpName, buffer, 'binary', err => {
    if (err) console.log(err);
    console.log('file created');

    const faceRectangles = createRectangles(tmpName);

    faceRectangles.forEach((fc, i) => {
      const { bottom, top, right, left } = fc.rect || {};

      const width = (right - left) * scale;
      const height = (bottom - top) * scale;
      const x = left;
      const y = top;

      gm(buffer)
        .crop(width, height, x, y)
        .toBuffer('JPG', (error, croppedBuffer) => {
          if (error) console.log(error);
          // этого не будет, сделано для проверки
          gm(croppedBuffer).write(`./images/face${i + 1}.jpg`, () => {
            console.log(`image #${i + 1} created`);
          });
        });
    });

    fs.unlink(tmpName, () => console.log('file deleted'));
  });
}

module.exports = getBuffer;
