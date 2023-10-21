"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const predict_1 = __importDefault(require("../predict"));
const fs_1 = __importDefault(require("fs"));
globals_1.test('Check that picture of cat returns cat', () => {
    const cat = fs_1.default.readFileSync('cat.txt').toString();
    return predict_1.default(cat).then(data => {
        globals_1.expect(data.classification).toBe('Cat');
    });
});
//# sourceMappingURL=predict.test.js.map