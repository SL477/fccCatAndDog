import { expect, test } from '@jest/globals';
import predict from '../predict';
import * as dotenv from 'dotenv';
dotenv.config();

test('Check that picture of cat returns cat', () => {
    // eslint-disable-next-line prefer-const
    let cat = process.env.CAT? process.env.CAT : '';
    return predict(cat).then(data => {
        expect(data.classification).toBe('Cat');
    });
});