# fccCatAndDog

Cat and Dog Image Classifier

The final website is here: [catvdog.link477.com](https://catvdog.link477.com/)

Image height & width needs to be 160 pixels

[Model link](https://drive.google.com/file/d/1ZYKbOzHPkz3Bq9pbASrr4ZuyJSjCuIFs/view?usp=sharing)

![Final app](CatAndDogImageClassifier.JPG)

## Setup

- Download the model from [here](https://drive.google.com/file/d/1ZYKbOzHPkz3Bq9pbASrr4ZuyJSjCuIFs/view?usp=sharing)
- npm install

## Docker

Build with:

```bash
docker build -t fcccatanddog .
```

Run with:

```bash
docker run -dp 3000:3000 fcccatanddog
```

## Build

Transpile TypeScript with

```bash
tsc --watch
```

Run prettier with

```bash
prettier . --write
```

Run babel with

```bash
npm run babel_me
```

Then delete the unneeded require calls.

## Old dependancies

"devDependencies": {
    "@babel/cli": "^7.28.6",
    "@babel/core": "^7.29.0",
    "@babel/preset-env": "^7.29.2",
    "@babel/preset-typescript": "^7.28.5",
    "@types/express": "^5.0.6",
    "@typescript-eslint/eslint-plugin": "^8.57.2",
    "@typescript-eslint/parser": "^8.57.2",
    "babel-jest": "^30.3.0",
    "eslint": "^10.1.0",
    "jest": "^30.3.0",
    "ts-jest": "^29.4.6",
    "ts-node": "^10.9.2",
    "typescript": "^6.0.2"
  },
