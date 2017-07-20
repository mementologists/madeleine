const db = require('../');

const Moment = db.Model.extend({
  tableName: 'moments',
  users() {
    return this.hasMany('Profile');
  }
});


module.exports = db.model('Moment', Moment);
