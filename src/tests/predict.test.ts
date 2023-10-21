import { expect, test } from '@jest/globals';
import predict from '../predict';
import fs from 'fs';

test('Check that picture of cat returns cat', () => {
    const cat = fs.readFileSync('cat.txt').toString();
    return predict(cat).then((data) => {
        expect(data.classification).toBe('Cat');
    });
});
