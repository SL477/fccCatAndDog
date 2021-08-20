const tf = require('@tensorflow/tfjs-node');

async function predict(pic) {
    const handler = tf.io.fileSystem('./jsmodel/model.json');
    const model = await tf.loadLayersModel(handler);
    //let ex = tfjs.browser.fromPixels(pic);
    const b = Buffer.from(pic, 'base64');
    let ex = tf.node.decodeImage(b, 3);
    ex = ex.expandDims(0)
    //console.log("shape", ex.shape);
    let p = model.predict(ex);
    //console.log("pred",p);
    console.log("pred",p.dataSync()[0]);
    //console.log("pred",p.toString());
    return p.dataSync()[0];
}

module.exports = predict;