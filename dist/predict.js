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
        let ex = tfjs_node_1.node.decodeImage(b, 3);
        ex = ex.reshape([1, 160, 160, 3]);
        const p = model.predict(ex);
        const predictions = p.toString().split(' ');
        let cat = predictions[5];
        cat = cat.replace(/\[/g, '');
        cat = cat.replace(/,/g, '');
        let dog = predictions[6];
        dog = dog.replace(/\]/g, '');
        dog = dog.replace(/,/g, '');
        const ret = {
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
    });
}
exports.default = predict;
//# sourceMappingURL=predict.js.map