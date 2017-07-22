const {
  assert,
  expect
 } = require('chai');
const {
  describe,
  it
} = require('mocha');
const httpMocks = require('node-mocks-http');
const {
  reqS3uri
} = require('../middleware').moments;

describe('s3 middleware', () => {
  const obj = {
    method: 'POST',
    url: '/api/moments',
    body: {
      moment: {
        id: 0,
        userId: 2,
        keys: ['text'],
        media: {
          teaser: 'TESTING TESTING',
          audio: '',
          photo: '',
          text: { filename: 'adams.txt', contentType: 'txt' }
        },
        sentiment: 0,
        createdAt: new Date()
      }
    }
  };
  let request = httpMocks.createRequest(obj);
  let response = httpMocks.createResponse();
    // runs before all tests in this block
  it('should call next', () => {
    const calledNext = () => {
      assert(true);
    };
    reqS3uri(request, response, calledNext);
  });
  it('should decorate one media[keys] with s3 header', () => {
    const testIt = () => {
      expect(request.body.moment.media.text).to.have.all.keys('uri', 'contentType', 's3Head');
    };
    reqS3uri(request, response, testIt);
  });
  it('should decorate multiple media[keys] with s3 header', () => {
    obj.body.moment.media.photo = { filename: 'adams.jpg', contentType: 'image/jpeg' };
    obj.body.moment.media.text = { filename: 'adams.txt', contentType: 'txt' };
    obj.body.moment.keys.push('photo');
    request = httpMocks.createRequest(obj);
    response = httpMocks.createResponse();
    const asyncTest = () => {
      const { keys,
              media } = request.body.moment;
      keys.forEach((key) => {
        expect(media[key]).to.have.all.keys('uri', 'contentType', 's3Head');
      });
    };
    reqS3uri(request, response, asyncTest);
  });
});
