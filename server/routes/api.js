const express = require('express');

const router = express.Router();
const {
  serviceMap,
  storeMomentId,
  reqS3uri
} = require('../middleware').moments;


router.route('/')
  .get((req, res) => {
    res.status(200).send('Hello World!');
  })
  .post((req, res) => {
    res.status(201).send({ data: 'Posted!' });
  });

router.route('/moments')
  .get((req, res) => {
    res.status(200).send('Searching...');
  })
  .post(storeMomentId, reqS3uri, (req, res) => {
    res.status(201).send({ moment: req.body.moment });
  });

router.route('/bktd')
  .get((req, res) => {
    res.status(200).send('yey');
  })
  .post(serviceMap, (req, res) => {
    res.status(201).send({ data: 'Processing' });
  });

module.exports = router;
