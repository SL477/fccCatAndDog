"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const tfjs_node_1 = require("@tensorflow/tfjs-node");
function predict(pic) {
    return __awaiter(this, void 0, void 0, function* () {
        const handler = tfjs_node_1.io.fileSystem('./jsmodel/model.json');
        const model = yield tfjs_node_1.loadLayersModel(handler);
        const b = Buffer.from(pic, 'base64');
        const ex = tfjs_node_1.node.decodeImage(b, 3).reshape([1, 160, 160, 3]);
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
    });
}
exports.default = predict;
function SortOutPrediction(prediction) {
    return Number(prediction.replace(/[\]\[,]/g, ''));
}
//# sourceMappingURL=predict.js.map