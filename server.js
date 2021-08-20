const express = require('express');
const tf = require('@tensorflow/tfjs-node');

const predict = require('./predict');

const path = require("path");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.route('/')
    .get(function (req, res) {
      res.sendFile(process.cwd() + '/views/index.html');
    });

app.route('/main.js')
    .get(function(req, res) {
        res.sendFile(process.cwd() + '/views/main.js');
    });

app.post('/predict', async (req, res) => {
    try {
        let p = await predict(req.body.pic);
        res.json({'prediction': p});
    }
    catch (e) {
        res.json({'prediction': -1, 'error': e});
    }
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
