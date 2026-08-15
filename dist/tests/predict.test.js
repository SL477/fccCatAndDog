import { test } from 'node:test';
import assert from 'node:assert';
import predict from '../predict.js';
import fs from 'fs';
import { modelLoader } from '../modelHelper.js';

test('Check that picture of cat returns cat', async () => {
  const cat = fs.readFileSync('cat.txt').toString();
  const model = await modelLoader();
  const data = await predict(cat, model);
  assert.strictEqual(data.classification, 'Cat', 'Expected classification to be "Cat"');
});
