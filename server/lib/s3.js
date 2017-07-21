const crypto = require('crypto');
const config = require('config').awsS3;

const secret = 'I love GoT';

const s3Config = {};
s3Config.accessKey = process.env.AWS_KEY || config.key;
s3Config.secretKey = process.env.AWS_SECRET || config.secret;
s3Config.bucket = process.env.S3_BUCKET || config.bucket;
s3Config.region = process.env.S3_REGION || 'us-west-1';

const s3Helpers = {
  dateString() {
    const date = new Date().toISOString();
    return date.substr(0, 4) + date.substr(5, 2) + date.substr(8, 2);
  },

  amzCredential(amzConfig) {
    return [amzConfig.accessKey, s3Helpers.dateString(), amzConfig.region, 's3/aws4_request'].join('/');
  },

  // Constructs the policy
  s3UploadPolicy(uploadConfig, params, credential) {
    return {
      // 5 minutes into the future
      expiration: new Date((new Date()).getTime() + (5 * 60 * 1000)).toISOString(),
      conditions: [
        { bucket: uploadConfig.bucket },
        {
          key: crypto.createHmac('sha256', secret)
            .update(params.filename)
            .digest('hex')
        },
        { acl: 'public-read' },
        { success_action_status: '201' },
        // Optionally control content type and file size
        // A content-type clause is required (even if it's all-permissive)
        // so that the uploader can specify a content-type for the file
        ['starts-with', '$Content-Type', ''],
        ['content-length-range', 0, 1000000],
        { 'x-amz-algorithm': 'AWS4-HMAC-SHA256' },
        { 'x-amz-credential': credential },
        { 'x-amz-date': `${s3Helpers.dateString()}T000000Z` }
      ],
    };
  },

  hmac(key, string) {
    const hmacRoute = crypto.createHmac('sha256', key);
    hmacRoute.end(string);
    return hmacRoute.read();
  },

  // Signs the policy with the credential
  s3UploadSignature(sigConfig, policyBase64) {
    const dateKey = s3Helpers.hmac(`AWS4${sigConfig.secretKey}`, s3Helpers.dateString());
    const dateRegionKey = s3Helpers.hmac(dateKey, sigConfig.region);
    const dateRegionServiceKey = s3Helpers.hmac(dateRegionKey, 's3');
    const signingKey = s3Helpers.hmac(dateRegionServiceKey, 'aws4_request');
    return s3Helpers.hmac(signingKey, policyBase64).toString('hex');
  },

  // Returns the parameters that must be passed to the API call
  s3Params(pramConfig, params) {
    const credential = s3Helpers.amzCredential(pramConfig);
    const policy = s3Helpers.s3UploadPolicy(pramConfig, params, credential);
    const policyBase64 = new Buffer(JSON.stringify(policy)).toString('base64');
    return {
      key: crypto.createHmac('sha256', secret)
        .update(params.filename)
        .digest('hex'), // hash the file
      acl: 'public-read',
      success_action_status: '201',
      policy: policyBase64,
      'content-type': params.contentType,
      'x-amz-algorithm': 'AWS4-HMAC-SHA256',
      'x-amz-credential': credential,
      'x-amz-date': `${s3Helpers.dateString()}T000000Z`,
      'x-amz-signature': s3Helpers.s3UploadSignature(pramConfig, policyBase64, credential)
    };
  },

  s3Credentials(credConfig, params) {
    return {
      endpointUrl: `https://${credConfig.bucket}.s3-us-west-1.amazonaws.com`,
      params: s3Helpers.s3Params(credConfig, params)
    };
  },
};

module.exports = {
  s3Config,
  s3Helpers
};
