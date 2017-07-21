const assert = require('assert');
const helper = require('../lib/s3').s3Helpers;
const config = require('../lib/s3').s3Config;

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

  it('sending files to correct bucket', () => {
    assert.equal(config.bucket, 'madeleinemoment', 'use correct location for region');
  });

  it('location is us west-1', () => {
    assert.equal(config.region, 'us-west-1', 'use correct location for region');
  });
});
