
# Node Face Detector

[![Greenkeeper badge](https://badges.greenkeeper.io/YozhikM/node-face-detector.svg)](https://greenkeeper.io/)

This is node module based on the use of face-recognition.js, written to cut faces from the images.

## How to use

````js
git clone https://github.com/YozhikM/node-face-detector.git

yarn

yarn start

yarn build
````

## API

`cropFace` function accepts a buffer and an optional scale.

````js
function cropFace(buffer: Buffer, scale: number = 1): Promise<Buffer>
````

With the help of `imgPath` and `srcBuffer` you can create a buffer from an existing image or use a buffer without them.
Images in the current implementation are saved to the local disk.