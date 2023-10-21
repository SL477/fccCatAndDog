import {io, loadLayersModel, node} from '@tensorflow/tfjs-node';
import {Prediction} from './prediction';

export default async function predict(pic: string) : Promise<Prediction> {
    const handler = io.fileSystem('./jsmodel/model.json');
    const model = await loadLayersModel(handler);

    const b = Buffer.from(pic, 'base64');
    let ex = node.decodeImage(b, 3);

    ex = ex.reshape([1, 160, 160, 3]);
    const p = model.predict(ex);

    const predictions = p.toString().split(' ');
    let cat = predictions[5];
    cat = cat.replace(/\[/g, '');
    cat = cat.replace(/,/g, '');
    
    let dog = predictions[6];
    dog = dog.replace(/\]/g, '');
    dog = dog.replace(/,/g, '');

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