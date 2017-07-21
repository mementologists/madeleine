const expect = require('chai').expect;
const Moment = require('../../db/models/moments.js');
const dbUtils = require('../../db/lib/utils.js');

describe('Moment model tests', () => {
  beforeEach((done) => {
    dbUtils.rollbackMigrate(done);
  });

  afterEach((done) => {
    dbUtils.rollback(done);
  });

  it('Should be able to retrieve test data', (done) => {
    Moment.forge().fetchAll()
      .then((results) => {
        expect(results.length).to.equal(1);
        expect(results.at(0).get('id')).to.equal(0);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});
