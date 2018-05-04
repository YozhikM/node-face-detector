# Node Face Detector

[![install size](https://packagephobia.now.sh/badge?p=node-face-detector@1.0.2)](https://packagephobia.now.sh/result?p=node-face-detector@1.0.2)
![FlowType compatible](https://img.shields.io/badge/flowtype-compatible-brightgreen.svg)

## Requirements

* [face-recognition](https://github.com/justadudewhohacks/face-recognition.js);
* [gm](https://github.com/aheckmann/gm);
* [request](https://github.com/request/request);
* [tmp](https://github.com/raszi/node-tmp).

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
  'https://almaty.hh.kz/photo/492004920.jpeg?t=1520531261&h=Yerj2GWZtRPEUR6cQFGSjw'
).then(({ buffer, format }) =>
  fs.writeFile(`./images/face_out.${format}`, buffer, () => console.log('file writted'))
);
```
