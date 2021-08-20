
const predict = require('./predict');
require('dotenv').config();

test('Check that picture of cat returns cat', () => {
    return predict(process.env.CAT).then(data => {
        expect(data).toBe(0);
    });
});
