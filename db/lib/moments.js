const models = require('../models');

module.exports = {

  getAllUserMoments(userID) {
    return new models.Moment().where('user_id', userID)
    .fetchAll();
  },

  getMoment(momentID) {
    return models.Moment.where({ id: momentID }).fetch();
  },

  saveMoment(momentObject) {
    const params = {
      display_type: momentObject.displayType,
      avg_sentiment: momentObject.sentiment,
      highlight: momentObject.highlight,
      video_uri: momentObject.media.video.uri || null,
      text_uri: momentObject.media.text.uri || null,
      image_uri: momentObject.media.image.uri || null,
      keys: JSON.stringify(momentObject.keys),
      user_id: momentObject.userId
    };
    return models.Moment.forge(params).save();
  },

  updateSentiment(momentObject) {
    return models.Moment.where('id', momentObject.id)
    .fetch()
    .then(moment => moment.save({ avg_sentiment: momentObject.sentiment }));
  },

  updateMoment(momentObject) {
    return models.Moment.where({
      id: momentObject.id
    }).fetch()
      .then((uniqueMoment) => {
        uniqueMoment.save({
          display_type: momentObject.displayType,
          avg_sentiment: momentObject.sentiment,
          highlight: momentObject.highlight,
          video_uri: momentObject.media.video.uri,
          text_uri: momentObject.media.text.uri,
          image_uri: momentObject.media.image.uri,
          user_id: momentObject.userId
        }, { method: 'update' });
      });
  }
};
