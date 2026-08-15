 import { node } from '@tensorflow/tfjs-node';

/**
 * Predict from the given base 64 string whether the image is a cat or dog
 * @param {string} pic The base 64 string of an image of 160px x 160px
 * @param {*} model The TF model
 * @returns {{error: boolean, cat: number, dog: number, classification: string}}
 */
export default async function predict(pic, model) {
    const b = Buffer.from(pic, 'base64');
    const ex = node.decodeImage(b, 3).reshape([1, 160, 160, 3]);
    const p = model.predict(ex);
    const predictions = p.toString().split(' ');
    const cat = SortOutPrediction(predictions[5]);
    const dog = SortOutPrediction(predictions[6]);
    const ret = {
        error: false,
        cat: cat,
        dog: dog,
        classification: cat >= 0.5 ? 'Cat' : dog >= 0.5 ? 'Dog' : 'Neither',
    };
    return ret;
}

/**
 * Replace the [, ] and , in the returned string and converts to a number
 * @param {string} prediction 
 * @returns {number}
 */
function SortOutPrediction(prediction) {
    return Number(prediction.replace(/[\]\[,]/g, ''));
}
