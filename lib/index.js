'use strict';

var fs = require('fs');
var cropFace = require('./cropFace');

var imgPath = './images/5.jpg';
var srcBuffer = fs.readFileSync(imgPath);

cropFace(srcBuffer).then(function (buffer) {
  fs.writeFile('./images/_face_out.jpg', buffer, function () {
    return console.log('file writted');
  });
}).catch(function (err) {
  return console.error(err);
});