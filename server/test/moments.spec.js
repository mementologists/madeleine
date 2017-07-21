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
  const request = httpMocks.createRequest({
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
  });
  const response = httpMocks.createResponse();
    // runs before all tests in this block
  it('should call next', () => {
    const calledNext = () => {
      assert(true);
    };
    reqS3uri(request, response, calledNext);
  });
  it('should decorate one media[keys] with s3 header', () => {
    reqS3uri(request, response, () => {});
    expect(request.body.moment.media.text).to.have.all.keys('uri', 'contentType', 's3Head');
  });
  it('should decorate multiple media[keys] with s3 header', () => {
    request.body.moment.media.photo = { filename: 'adams.jpg', contentType: 'image/jpeg' };
    request.body.moment.keys.push('photo');
    console.log(request.body.moment.keys);
    const x = (y) => {
      console.log('HELLO', y);
    };
    reqS3uri(request, response, x);
    const { keys,
            media } = request.body.moment;
    keys.forEach((key) => {
      expect(media[key]).to.have.all.keys('uri', 'contentType', 's3Head');
    });
  });
});
