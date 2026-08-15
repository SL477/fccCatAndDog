import { io, loadLayersModel, node } from '@tensorflow/tfjs-node';
export default async function predict(pic) {
    const handler = io.fileSystem('./jsmodel/model.json');
    const model = await loadLayersModel(handler);
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
function SortOutPrediction(prediction) {
    return Number(prediction.replace(/[\]\[,]/g, ''));
}
//# sourceMappingURL=predict.js.map