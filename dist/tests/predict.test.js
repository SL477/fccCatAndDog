import { test } from 'node:test';
import assert from 'node:assert';
import predict from '../predict.js';
import fs from 'fs';

test('Check that picture of cat returns cat', async () => {
    const cat = fs.readFileSync('cat.txt').toString();
    const data = await predict(cat);
    assert.strictEqual(data.classification, 'Cat', 'Expected classification to be "Cat"');
});
