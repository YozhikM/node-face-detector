
# Node Face Detector

[![Greenkeeper badge](https://badges.greenkeeper.io/YozhikM/node-face-detector.svg)](https://greenkeeper.io/)

This is node module based on the use of https://github.com/justadudewhohacks/face-recognition.js, written to cut faces from the images.

## How to use

```
git clone https://github.com/YozhikM/node-face-detector.git

yarn
```

Then run two tasks, because the two Big Brothers (Nodemon and Babel) are watching you in two different folders

```
yarn build

yarn start
```

## API

`getCroppedFace` function accepts a url as a string and an optional scale.

````js
function getCroppedFace(src: string, scale?: number = 1): Promise<{ buffer: Buffer, format: string }>
````

The src address can be either local or external - URL.
You can not use the image format returned in promise, but I am not responsible for the consequences.
