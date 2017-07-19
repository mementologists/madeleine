const Axios = require('axios');
const config = require('config').servers.services;
const Promise = require('bluebird');

module.exports.serviceMap = (req, res, next) => {
  const moment = req.body.moment;
  Promise.resolve(moment.keys)
    .then(keys => (
      Promise.map(keys, (key) => {
        const port = config[key].port ? `:${config[key].port}` : '';
        const uri = `${config[key].uri}${port}`;
        return Axios.post(`${uri}/api/process`, { moment });
      })
    ))
    .then(() => next())
    .catch(err => res.redirect('/failure', err));
  next();
};

module.exports.storeMomentId = (req, res, next) => {
  // store the id
  next();
};

module.exports.reqS3uri = (req, res, next) => {
  // fetch s3
  // decorate momentObj with valid s3 uri's
  next();
};
