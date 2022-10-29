# fccCatAndDog

Cat and Dog Image Classifier

Image height & width needs to be 150 pixels
classname = ['cat', 'dog']
p = model.predict(data)
classname[np.argmax(p[0])]

[Model link](https://drive.google.com/file/d/1ZYKbOzHPkz3Bq9pbASrr4ZuyJSjCuIFs/view?usp=sharing)

![Final app](https://link477.com/dataScience/CatAndDogImageClassifier.JPG)

## Setup

- Download the model from [here](https://drive.google.com/file/d/1ZYKbOzHPkz3Bq9pbASrr4ZuyJSjCuIFs/view?usp=sharing)
- npm install

## Docker

Build with:
docker build -t fcccatanddog .

Run with:
docker run -dp 3000:3000 fcccatanddog
