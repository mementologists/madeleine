const knex = require('knex')(require('../../knexfile'));

exports.rollbackMigrate = (done) => {
  knex.migrate.rollback()
    .then(() => knex.migrate.latest())
    .then(() => knex.seed.run())
    .then(() => {
      done();
    })
    .catch((err) => {
      console.log('error in migration:', err);
      done();
    });
};

exports.rollback = (done) => {
  knex.migrate.rollback()
    .then(() => {
      done();
    })
    .catch((err) => {
      console.log('err in migration afterEach', err);
      done();
    });
};
