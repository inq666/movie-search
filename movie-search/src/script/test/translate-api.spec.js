const Api = require('./translate-api');
require('jest-fetch-mock').enableMocks();

describe('Api: translate', () => {
  test('function translate should return translate of a word if it is Russian', async () => {
    const resolve = await Api.translate('мстители');
    expect(resolve).toMatch(/avengers/);
  });
  test('function translate should return translate of a word if it is Russian', async () => {
    const resolve = await Api.translate('fight club');
    expect(resolve).toMatch(/it is an english word/);
  });
  test('function translate should return translate of a word if it is Russian', async () => {
    const resolve = await Api.translate('requiem for a dream');
    expect(resolve).toMatch(/it is an english word/);
  });
  test('function translate should return translate of a word if it is Russian', async () => {
    const resolve = await Api.translate('никогда не сдавайся');
    expect(resolve).toMatch(/never give up/);
  });
});
