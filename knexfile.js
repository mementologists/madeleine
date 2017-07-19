const config = require('config');

const remoteDB = {
  client: 'pg',
  connection: process.env.DATABASE_URL,
  pool: {
    min: 1,
    max: 2
  },
  migrations: {
    tableName: 'knex_migrations',
    directory: 'db/migrations'
  },
  seeds: {
    directory: 'db/seeds'
  },
  ssl: true
};

module.exports = process.env.DATABASE_URL ? remoteDB : config.knex;
