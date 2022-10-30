import * as tf from '@tensorflow/tfjs-node';
import Prediction from './prediction';

export default async function predict(pic: string) : Promise<Prediction> {
    const handler = tf.io.fileSystem('./jsmodel/model.json');
    const model = await tf.loadLayersModel(handler);

    const b = Buffer.from(pic, 'base64');
    let ex = tf.node.decodeImage(b, 3);

    ex = ex.reshape([1, 160, 160, 3]);
    const p = model.predict(ex);

    // console.log('pred', p.toString());

    const preds = p.toString().split(' ');
    let cat = preds[5];
    while (cat.indexOf('[') > -1) {
        cat = cat.replace('[', '');
    }
    while (cat.indexOf(',') > -1) {
        cat = cat.replace(',', '');
    }
    let dog = preds[6];
    while (dog.indexOf(']') > -1) {
        dog = dog.replace(']', '');
    }
    while (dog.indexOf(',') > -1) {
        dog = dog.replace(',', '');
    }

    const ret: Prediction = {
        'error': false,
        'cat': Number(cat),
        'dog': Number(dog),
        'classification': 'Neither',
    };
    if (ret['cat'] >= 0.5) {
        ret['classification'] = 'Cat';
    }
    else if (ret['dog'] >= 0.5) {
        ret['classification'] = 'Dog';
    }

    return ret;
}