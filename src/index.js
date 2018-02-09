/* @flow */

const fs = require('fs');
const cropFace = require('./cropFace');

const imgPath = './images/34.jpeg';
const srcBuffer = fs.readFileSync(imgPath);

cropFace(srcBuffer, 2)
  .then(buffer => {
    fs.writeFile('./images/_face_out.jpg', buffer, () => console.log('file writted'));
  })
  .catch(err => console.error(err));
