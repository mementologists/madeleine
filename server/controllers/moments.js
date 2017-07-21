const models = require('../../db/models');

module.exports = {

  getAllMoments: (req, res) => {
    models.Moment.where({ user_id: req.body.userId }).fetch()
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
    models.Moment.where({ id: req.body.MomentId }).fetch()
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
    models.Moment.forge(req.body).save()
      .then(() => {
        models.Moment.forge({
          display_type: req.body,
          avg_sentiment: req.body.sentiment,
          highlight: req.body.highlight,
          audio_uri: req.body.audio,
          text_uri: req.body.media.text,
          photo_uri: req.bodymedia.image,
          user_id: req.body.userId,
        })
          .save();
      })
      .then(() => {
        res.sendStatus(201);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  },

  updateMoment: (req, res) => {
    models.Moment.where({
      id: req.param.id
    }).fetch()
      .then((uniqueMoment) => {
        if (!uniqueMoment) {
          throw uniqueMoment;
        }
        uniqueMoment.save({
          display_type: req.body,
          avg_sentiment: req.body.sentiment,
          highlight: req.body.highlight,
          audio_uri: req.body.audio,
          text_uri: req.body.media.text,
          photo_uri: req.bodymedia.image,
          user_id: req.body.userId,
        }, { method: 'update' });
      })
      .then(() => {
        res.sendStatus(200);
      })
      .error((err) => {
        res.status(500).send(err);
      })
      .catch(() => {
        res.sendStatus(404);
      });
  }

};
