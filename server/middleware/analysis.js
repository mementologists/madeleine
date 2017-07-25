const Axios = require('axios');
const config = require('config').servers.services;

const analysisUri = process.env.ANALYSIS_SERVER || config.analysis.uri;
const analysisPort = process.env.ANALYSIS_SERVER_PORT || config.analysis.port;
/* eslint-disable no-unneeded-ternary */
const analysisEndPoint =
  `${analysisUri}${analysisPort ? ':' : ''}${analysisPort ? analysisPort : ''}/api/process`;
/* eslint-enable no-unneeded-ternary */

module.exports.getSummary = (req, res, next) =>
  Axios.get(`${analysisEndPoint}/${req.user.id}`)
  .then((resp) => {
    res.data = resp.data;
    return next();
  });

