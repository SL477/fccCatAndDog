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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const tf = __importStar(require("@tensorflow/tfjs-node"));
const predict_1 = __importDefault(require("./predict"));
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.get('/', (req, res) => {
    res.sendFile(process.cwd() + '/views/index.html');
});
app.get('/main.js', (req, res) => {
    res.sendFile(process.cwd() + '/client/main.js');
});
app.get('/style.css', (req, res) => {
    res.sendFile(process.cwd() + '/views/style.css');
});
app.get('/summary', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const model = yield tf.loadLayersModel(tf.io.fileSystem('./jsmodel/model.json'));
    model.summary();
    res.send('Look at the server');
}));
app.post('/predict', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const p = yield (0, predict_1.default)(req.body.pic);
        res.json(p);
    }
    catch (e) {
        console.log('post predict', e);
        res.json({ 'classification': 'error', 'error': true, 'cat': 0, 'dog': 0 });
    }
}));
app.use(function (req, res, next) {
    res.status(404)
        .type('text')
        .send('Not Found');
});
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
//# sourceMappingURL=server.js.map