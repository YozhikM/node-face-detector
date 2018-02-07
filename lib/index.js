const imgPath = './images/many-faces.jpg';
const buffer = require('fs').readFileSync(imgPath);
const getBuffer = require('./getBuffer');

getBuffer(buffer, 1.25);