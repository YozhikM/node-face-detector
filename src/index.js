/* @flow */

const fs = require('fs');
const cropFace = require('./cropFace');

const imgPath = './images/5.jpg';
const srcBuffer = fs.readFileSync(imgPath);

cropFace(srcBuffer)
  .then(buffer => {
    fs.writeFile('./images/_face_out.jpg', buffer, () => console.log('file writted'));
  })
  .catch(err => console.error(err));
