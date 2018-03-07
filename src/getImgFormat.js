/* @flow */

function getImgFormat(body: Buffer): string {
  const isPng =
    body[0] === 137 &&
    body[1] === 80 &&
    body[2] === 78 &&
    body[3] === 71 &&
    body[4] === 13 &&
    body[5] === 10 &&
    body[6] === 26 &&
    body[7] === 10;

  const isJpg = body[0] === 255 && body[1] === 216 && body[2] === 255;

  let format = "";
  if (isPng) {
    format = "png";
  } else if (isJpg) {
    format = "jpg";
  }

  return format;
}

module.exports = getImgFormat;
