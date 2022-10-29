import * as tf from '@tensorflow/tfjs-node';

export default async function predict(pic: any) {
    const handler = tf.io.fileSystem('./jsmodel/model.json');
    const model = await tf.loadLayersModel(handler);

    const b = Buffer.from(pic, 'base64');
    let ex = tf.node.decodeImage(b, 3);

    ex = ex.reshape([1, 160, 160, 3]);
    const p = model.predict(ex);

    // console.log('pred', p.toString());
    return p.toString();
}