/* @flow */

const fs = require("fs");
const request = require("request");
const cropFace = require("./cropFace");
const getImgFormat = require("./getImgFormat");

function getImgAsBuffer(
  src: string
): Promise<{ buffer: Buffer, format: string }> {
  // if local file
  if (fs.existsSync(src)) {
    const srcBuffer = fs.readFileSync(src);
    const format = getImgFormat(srcBuffer);

    return Promise.resolve({ buffer: srcBuffer, format });
  }
  return new Promise((resolve, reject) => {
    request(
      {
        url: src,
        method: "GET",
        encoding: null
      },
      (error: Error, response, body: Buffer) => {
        if (error) {
          return reject(error);
        }

        const format = getImgFormat(body);

        return resolve({ buffer: body, format });
      }
    );
  });
}

function getCroppedFace(
  url: string,
  scale?: number = 1
): Promise<{ buffer: Buffer, format: string }> {
  return new Promise((resolve, reject) => {
    getImgAsBuffer(url)
      .then(data => {
        const { buffer, format } = data || {};
        cropFace(buffer, scale)
          .then(croppedBuffer => resolve({ buffer: croppedBuffer, format }))
          .catch(err => reject(err));
      })
      .catch(err => reject(err));
  });
}

module.exports = getCroppedFace;
