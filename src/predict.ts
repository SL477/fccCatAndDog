import {io, loadLayersModel, node} from '@tensorflow/tfjs-node';
import {Prediction} from './prediction';

/**
 * Predict from the given base 64 string whether the image is a cat or dog
 * @param pic{string} The base 64 string of an image of 160px x 160px
 */
export default async function predict(pic: string) : Promise<Prediction> {
    const handler = io.fileSystem('./jsmodel/model.json');
    const model = await loadLayersModel(handler);

    const b = Buffer.from(pic, 'base64');
    const ex = node.decodeImage(b, 3).reshape([1, 160, 160, 3]);
    const p = model.predict(ex);

    const predictions = p.toString().split(' ');
    const cat = SortOutPrediction(predictions[5]);  
    const dog = SortOutPrediction(predictions[6]);

    const ret: Prediction = {
        'error': false,
        'cat': cat,
        'dog': dog,
        'classification': cat >= 0.5? 'Cat' : dog >= 0.5? 'Dog' : 'Neither',
    };

    return ret;
}

/**
 * Replace the [, ] and , in the returned string and converts to a number
 * Eslint gets a bit confused with this
 * @param prediction{string} The string tensor
 * @returns{number}
 */
function SortOutPrediction(prediction: string): number {
    // eslint-disable-next-line no-useless-escape
    return Number(prediction.replace(/[\]\[,]/g, ''));
}