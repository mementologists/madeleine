const Axios = require('axios');
// const config = require('config').servers.services;
const models = require('../../db/models');
const Promise = require('bluebird');
const s3 = require('../lib').s3;

const { s3Config } = s3;
const { s3Credentials } = s3.s3Helpers;

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

module.exports.storeMomentId = (req, res, next) => {
  // store the id
  next();
};

module.exports.reqS3uri = (req, res, next) => {
  const moment = req.body.moment;
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
      const uri = `${endpointUrl}/${key}`;
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


module.exports.getAllMoments = (req, res, next) => models.Moment.where({
  user_id: req.body.userId }).fetch()
    .then(() => next());

module.exports.getMoment = (req, res, next) => models.Moment.where({
  id: req.body.MomentId }).fetch()
    .then(() => next());

module.exports.saveMoment = (req, res, next) => models.Moment.forge(req.body).save()
    .then(() => {
      models.Moment.forge({
        display_type: '',
        avg_sentiment: req.body.moment.sentiment,
        highlight: req.body.moment.highlight,
        audio_uri: req.body.moment.media.audio,
        text_uri: req.body.moment.media.text,
        photo_uri: req.body.momentmedia.image,
        user_id: req.body.moment.userId,
      })
        .save();
    })
    .then(() => next());

module.exports.updateMoment = (req, res, next) => models.Moment.where({
  id: req.param.id
}).fetch()
    .then((uniqueMoment) => {
      if (!uniqueMoment) {
        throw uniqueMoment;
      }
      uniqueMoment.save({
        display_type: '',
        avg_sentiment: req.body.moment.sentiment,
        highlight: req.body.moment.highlight,
        audio_uri: req.body.moment.media.audio,
        text_uri: req.body.moment.media.text,
        photo_uri: req.body.momentmedia.image,
        user_id: req.body.moment.userId,
      }, { method: 'update' });
    })
    .then(() => next());

