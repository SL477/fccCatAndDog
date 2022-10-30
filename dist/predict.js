"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const tf = __importStar(require("@tensorflow/tfjs-node"));
function predict(pic) {
    return __awaiter(this, void 0, void 0, function* () {
        const handler = tf.io.fileSystem('./jsmodel/model.json');
        const model = yield tf.loadLayersModel(handler);
        const b = Buffer.from(pic, 'base64');
        let ex = tf.node.decodeImage(b, 3);
        ex = ex.reshape([1, 160, 160, 3]);
        const p = model.predict(ex);
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