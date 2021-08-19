const express = require('express');
const tf = require('@tensorflow/tfjs-node');
//const { async } = require('regenerator-runtime');
const path = require("path");

//const model = tf.loadLayersModel('file:\\\C:\src\fccCatAndDog\jsmodel\model.json');

const app = express();

app.route('/')
    .get(function (req, res) {
      res.sendFile(process.cwd() + '/views/index.html');
    });

app.route('/main.js')
    .get(function(req, res) {
        res.sendFile(process.cwd() + '/views/main.js');
    });

app.route('/tf.min.js')
    .get(function(req, res) {
        res.sendFile(process.cwd() + "/views/tf.min.js");
    });

async function predict() {
    const handler = tf.io.fileSystem('./jsmodel/model.json');
    const model = await tf.loadLayersModel(handler);
    //model.predict())
    let data = tf.FromPixels()
    return model.summary();
}

app.route('/predict')
    .get(function(req, res) {
        res.json(predict());
    });

app.use(
    '/jsmodel/model',
    express.static(path.join(__dirname, "jsmodel/model.json"))
);
app.use(
    '/jsmodel',
    express.static(path.join(__dirname, "jsmodel"))
);

// 404 Not Found Middleware
app.use(function(req, res, next) {
    res.status(404)
      .type('text')
      .send('Not Found');
});

const portNum = process.env.PORT || 3000;

app.listen(portNum, () => {
    console.log(`Listening on port ${portNum}`);
});