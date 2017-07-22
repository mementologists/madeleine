const db = require('../');

const Profile = db.Model.extend({
  tableName: 'profiles',
  auths() {
    return this.hasMany('Auth');
  },
  moments() {
    return this.hasMany('Moment');
  }
});

module.exports = db.model('Profile', Profile);
