const models = require('../../db/models');

module.exports = {

  getAllMoments: (req, res) => {
    models.Moment.where({ user_id: req.params.userId }).fetch()
      .then((userMoments) => {
        if (!userMoments) {
          throw userMoments;
        }
        res.status(200).send(userMoments);
      })
      .error((err) => {
        res.status(500).send(err);
      })
      .catch(() => {
        res.sendStatus(404);
      });
  },

  getMoment: (req, res) => {
    models.Moment.where({ id: req.params.MomentId }).fetch()
      .then((moment) => {
        if (!moment) {
          throw moment;
        }
        res.status(200).send(moment);
      })
      .error((err) => {
        res.status(500).send(err);
      })
      .catch(() => {
        res.sendStatus(404);
      });
  },

  saveMoment: (req, res) => {

  },

  updateMoment: (req, res) => {

  }

};
