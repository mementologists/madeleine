const knex = require('knex')(require('../knexfile'));
const db = require('bookshelf')(knex);

db.plugin('registry');
db.plugin(require('bookshelf-modelbase').pluggable);

module.exports = db;

