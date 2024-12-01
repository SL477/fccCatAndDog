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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const tfjs_node_1 = require("@tensorflow/tfjs-node");
const predict_1 = __importDefault(require("./predict"));
const app = express_1.default();
const port = process.env.PORT || 3001;
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
    const model = yield tfjs_node_1.loadLayersModel(tfjs_node_1.io.fileSystem('./jsmodel/model.json'));
    let summary = '';
    model.summary(undefined, undefined, (x) => (summary += '<br>' + x));
    res.send('Summary: ' + summary);
}));
app.post('/predict', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const p = yield predict_1.default(req.body.pic);
        res.json(p);
    }
    catch (e) {
        console.log('post predict', e);
        res.json({ classification: 'error', error: true, cat: 0, dog: 0 });
    }
}));
app.use(function (req, res) {
    res.status(404).type('text').send('Not Found');
});
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
//# sourceMappingURL=server.js.map