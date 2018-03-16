# Node Face Detector

[![npm](https://img.shields.io/npm/dt/node-face-detector.svg)](http://www.npmtrends.com/node-face-detector)
[![Greenkeeper badge](https://badges.greenkeeper.io/YozhikM/node-face-detector.svg)](https://greenkeeper.io/)

This is node module based on the use of [face-recognition.js](https://github.com/justadudewhohacks/face-recognition.js), written to cut faces from the images.

## How to use

```
yarn add node-face-detector
```

Or

```
git clone https://github.com/YozhikM/node-face-detector.git
```

Then run two tasks, because the two Big Brothers (Nodemon and Babel) are watching you in two different folders

```
yarn build

yarn start
```

## API

`getCroppedFace` function accepts a url as a string and an optional scale.

```js
function getCroppedFace(src: string, scale?: number = 1): Promise<{ buffer: Buffer, format: string }>
```

The src address can be either local or external - URL.
You can not use the image format returned in promise, but I am not responsible for the consequences.

## Example

```js
getCroppedFace(
  "https://almaty.hh.kz/photo/492004920.jpeg?t=1520531261&h=Yerj2GWZtRPEUR6cQFGSjw"
).then(({ buffer, format }) =>
  fs.writeFile(`./images/face_out.${format}`, buffer, () =>
    console.log("file writted")
  )
);
```
