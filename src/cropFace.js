/* @flow */

const fs = require('fs');
const tmp = require('tmp');
const fr = require('face-recognition');
const gm = require('gm').subClass({ imageMagick: true });

type RectangleT = {
  confidence: number,
  rect: { area: number, bottom: number, left: number, right: number, top: number }
};

function createRectangles(imgPath: string): Array<RectangleT> {
  const image = fr.loadImage(imgPath);
  const detector = fr.FaceDetector();
  const faceRectangles = detector.locateFaces(image);

  if (faceRectangles) console.log('rectangles created');
  return faceRectangles;
}

function findRecognizableFace(faceRectangles: Array<RectangleT>): ?RectangleT {
  return faceRectangles.sort((first, second) => {
    const firstSum = first.confidence * first.rect.area;
    const secondSum = second.confidence * second.rect.area;
    return secondSum - firstSum;
  })[0];
}

function cropFace(buffer: Buffer, scale: number = 1): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const tmpobj = tmp.fileSync({ postfix: '.jpg' });
    const tmpName: string = tmpobj.name;

    fs.writeFile(tmpName, buffer, 'binary', err => {
      if (err) {
        console.error(err);
        return;
      }

      const faceRectangles = createRectangles(tmpName);

      fs.unlink(tmpName, () => console.log('file deleted'));

      const recognizableFace = findRecognizableFace(faceRectangles);

      if (!recognizableFace) {
        console.error('no founded any recognizable face');
        return;
      }

      const { bottom, top, right, left } = recognizableFace.rect || {};

      const width = (right - left) * scale;
      const height = (bottom - top) * scale;
      const x = left;
      const y = top;

      gm(buffer)
        .crop(width, height, x, y)
        .toBuffer('JPG', (error, croppedBuffer: Buffer) => {
          if (error) {
            reject(error);
            return;
          }

          resolve(croppedBuffer);
        });
    });
  });
}

module.exports = cropFace;
