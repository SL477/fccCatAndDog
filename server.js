const express = require('express');
const tf = require('@tensorflow/tfjs-node');
//const { async } = require('regenerator-runtime');
const path = require("path");
const bodyParser = require('body-parser');
const tfjs = require('@tensorflow/tfjs');

//const model = tf.loadLayersModel('file:\\\C:\src\fccCatAndDog\jsmodel\model.json');

const app = express();

//app.use(express.json());
//app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: false, limit: '50mb' }));
app.use(bodyParser.json({ limit: '50mb' }));

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

async function predict(pic) {
    const handler = tf.io.fileSystem('./jsmodel/model.json');
    const model = await tf.loadLayersModel(handler);
    //let ex = tfjs.browser.fromPixels(pic);
    const b = Buffer.from(pic, 'base64');
    let ex = tf.node.decodeImage(b, 3);
    //ex.shape = [null, 150, 150, 3];
    ex = ex.expandDims(0)
    //ex = ex.reshape([null, 150, 150, 3]);
    //console.log("shape", ex.shape);
    let p = model.predict(ex);
    //console.log("pred",p);
    console.log("pred",p.dataSync()[0]);
    //console.log("pred",p.toString());
    return p.dataSync()[0];
}

app.route('/predict')
    .post(function(req, res) {
        //console.log('body', req.body);
        res.json({'prediction': predict(req.body.pic)});
    });

async function summary() {
    const handler = tf.io.fileSystem('./jsmodel/model.json');
    const model = await tf.loadLayersModel(handler);
    model.summary();
}

app.route('/summary').get(function(req,res) {
    summary();
    res.send("check server");
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