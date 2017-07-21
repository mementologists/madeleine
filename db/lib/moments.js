const models = require('../models');

module.exports = {

  getAllMoments(userID) {
    return models.Moment.where({ user_id: userID }).fetch();
  },

  getMoment(momentID) {
    return models.Moment.where({ id: momentID }).fetch();
  },

  saveMoment(momentObject) {
    return models.Moment.forge(momentObject).save()
      .then(() => {
        models.Moment.forge({
          display_type: momentObject.moment.displayType,
          avg_sentiment: momentObject.moment.sentiment,
          highlight: momentObject.moment.highlight,
          audio_uri: momentObject.moment.media.audio,
          text_uri: momentObject.moment.media.text,
          photo_uri: momentObject.moment.media.image,
          user_id: momentObject.moment.userId,
          cred: momentObject.moment.cred
        });
      });
  },

  updateMoment(momentObject) {
    return models.Moment.where({
      id: momentObject.id
    }).fetch()
      .then((uniqueMoment) => {
        uniqueMoment.save({
          display_type: momentObject.moment.displayType,
          avg_sentiment: momentObject.moment.sentiment,
          highlight: momentObject.moment.highlight,
          audio_uri: momentObject.moment.media.audio,
          text_uri: momentObject.moment.media.text,
          photo_uri: momentObject.moment.media.image,
          user_id: momentObject.moment.userId,
        }, { method: 'update' });
      });
  }
};
