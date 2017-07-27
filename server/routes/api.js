const express = require('express');

const router = express.Router();
const {
  serviceMap,
  storeMoment,
  reqS3uri,
  updateMomentAvg,
  gatherUserMoments
} = require('../middleware').moments;

const { getSummary } = require('../middleware').analysis;

router.route('/')
  .get((req, res) =>
    res.status(200).send('Hello World!'))
  .post((req, res) =>
    res.status(201).send({ data: 'Posted!' }));

router.route('/moments')
  .get(gatherUserMoments, (req, res) =>
    res.status(200).send(res.allMoments))
  .post(reqS3uri, storeMoment, (req, res) =>
    res.status(201).send({ moment: req.body.moment }));

router.route('/bktd')
  .get((req, res) =>
    res.status(200).send('yey'))
  .post(serviceMap, (req, res) =>
    res.status(201).send({ data: 'Processing' }));

router.route('/process')
  .get(getSummary, (req, res) =>
    res.status(200).send({ aggregate: res.data }))
  .post(updateMomentAvg, (req, res) =>
    res.status(201).send({ data: 'Internalized!' }));

module.exports = router;
