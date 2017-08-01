const Axios = require('axios');
const config = require('config').servers.services;
const Promise = require('bluebird');
const s3 = require('../lib').s3;
const {
  getAllUserMoments,
  saveMoment,
  updateSentiment
} = require('../../db/lib/moments');

const { s3Config } = s3;
const { s3Credentials } = s3.s3Helpers;

const stripDotNotation = x => x.substr(x.lastIndexOf('.'));

module.exports.serviceMap = (req, res, next) => {
  const moment = req.body.moment;
  Promise.map(moment.keys, (key) => {
    const port = config[key].port ? `:${config[key].port}` : '';
    const uri = `${config[key].uri}${port}`;
    return Axios.post(`${uri}/api/process`, { moment });
  })
  .then(() => next())
  .catch(err => res.redirect('/failure', err));
};

module.exports.storeMoment = (req, res, next) => {
  saveMoment(req.body.moment)
  .then((entry) => {
    req.body.moment.id = entry.attributes.id;
    next();
  })
  .catch(err => console.log(err));
};

module.exports.reqS3uri = (req, res, next) => {
  const moment = req.body.moment;
  req.body.moment.userId = req.user.id;
  Promise.resolve(moment.keys)
  .then((keys) => {
    Promise.map(keys, (type) => {
      const media = moment.media[type];
      const { filename,
              contentType } = media;
      const s3Head = s3Credentials(s3Config, {
        filename,
        contentType
      });
      const { key } = s3Head.params;
      const { endpointUrl } = s3Head;
      const uri = `${endpointUrl}/${key}${stripDotNotation(filename)}`;
      req.body.moment.media[type] = {
        uri,
        contentType: s3Head.params['content-type'],
        s3Head
      };
    });
  })
  .then(() => next())
  .catch((err) => {
    res.redirect('/failure', err);
  });
};

module.exports.updateMomentAvg = (req, res, next) => {
  updateSentiment(req.body.moment)
  .then(() => next())
  .catch(err => res.status(404).send('Error on update request', err));
};

module.exports.gatherUserMoments = (req, res, next) => {
  const userId = req.user.id;
  getAllUserMoments(userId)
  .then((allMoments) => {
    res.allMoments = allMoments.models.map((model) => {
      const { attributes } = model;
      const { id, cred, highlight } = attributes;
      return {
        id,
        displayType: attributes.display_type,
        highlight,
        media: {
          video: { uri: attributes.video_uri },
          text: { uri: attributes.text_uri, s3Cred: cred },
          image: { uri: attributes.image_uri },
        },
        sentiment: attributes.avg_sentiment,
        createdAt: attributes.created_at,
        keys: attributes.keys
      };
    });
    res.userId = userId;
    next();
  })
  .catch(err => res.status(404).send('Error on moments request', err));
};
