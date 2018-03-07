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
  const faceRectangles: Array<RectangleT> = detector.locateFaces(image);

  if (faceRectangles.length > 0) console.log('rectangles created');
  return faceRectangles;
}

function findRecognizableFace(faceRectangles: Array<RectangleT>): RectangleT {
  return faceRectangles.sort((first, second) => {
    const firstSum = first.confidence * first.rect.area;
    const secondSum = second.confidence * second.rect.area;
    return secondSum - firstSum;
  })[0];
}

function cropFace(buffer: Buffer, scale?: number = 1): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    if (!Buffer.isBuffer(buffer)) {
      reject(new Error('provided object is not valid Buffer'));
    }

    const tmpobj = tmp.fileSync({ postfix: '.jpg' });
    const tmpName: string = tmpobj.name;

    fs.writeFile(tmpName, buffer, 'binary', err => {
      if (err) {
        reject(err);
        return;
      }

      const faceRectangles = createRectangles(tmpName);
      if (faceRectangles.length === 0) {
        reject(new Error('no founded any recognizable face'));
        return;
      }

      if (faceRectangles.length > 1) {
        console.log('more than one face was recognized', faceRectangles.length);
      }

      fs.unlink(tmpName, () => console.log('file deleted'));

      const recognizableFace = findRecognizableFace(faceRectangles);
      if (recognizableFace.confidence < 1) console.log('Bad photo');

      const { area, bottom, top, right, left } = recognizableFace.rect || {};
      if (area <= 10000) console.error(`small photo ${area}px`);

      const width = (right - left) * scale;
      const height = (bottom - top) * scale;
      let x = left;
      let y = top;

      if (scale) {
        const xRatio = (width - (right - left)) / scale;
        const yRatio = (height - (bottom - top)) / scale;
        x = left - xRatio;
        y = top - yRatio;
      }

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
