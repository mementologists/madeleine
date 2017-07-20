const db = require('../');

const Moment = db.Model.extend({
  tableName: 'moments',
  moments: function () {
    return this.hasMany('Moment');
  }
});

module.exports = db.model('Moment', Moment);


// all moments given user id 
// all info for a moment 
// add moment to db 
// update moment given uri 
// update avg sentiment 

