const assert = require('assert');
const helper = require('../routes/s3').s3Helpers;
const config = require('../routes/s3').s3Config;

console.log(helper);
console.log(config);

describe('dateString', () => {
  const result = helper.dateString();

  it('returns the date as a string', () => {
    assert.equal(typeof result, 'string', 'dateString is a String');
  });

  it('returns the correct date length', () => {
    assert.equal(result.length, 8, 'length is 8 digits');
  });

  it('returns the correct year', () => {
    assert.equal(result.substr(0, 4), '2017', 'year is 2017');
  });

  it('returns the correct month', () => {
    assert.equal(result.substr(4, 2), new Date().toISOString().substr(5, 2), 'current month');
  });

  it('returns the correct date', () => {
    assert.equal(result.substr(6, 2), new Date().toISOString().substr(8, 2), 'current date');
  });
});

describe('config keys', () => {
  it('has 4 keys', () => {
    assert.equal(Object.keys(config).length, 4, 'total keys should be 4');
  });

  it('bucket is us west', () => {
    assert.equal(config.bucket, 'us-west-2', 'use correct location for region');
  });

});
