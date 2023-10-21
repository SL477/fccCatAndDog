import { expect, test } from '@jest/globals';
import predict from '../predict';
import * as dotenv from 'dotenv';
dotenv.config();

test('Check that picture of cat returns cat', () => {
    const cat = process.env.CAT? process.env.CAT : '';
    return predict(cat).then(data => {
        expect(data.classification).toBe('Cat');
    });
});