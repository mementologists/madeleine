exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTableIfNotExists('profiles', (table) => {
      table.increments('id').unsigned().primary();
      table.string('first', 100).nullable();
      table.string('last', 100).nullable();
      table.string('display', 100).nullable();
      table.string('email', 100).nullable().unique();
      table.string('phone', 100).nullable();
      table.timestamps(true, true);
    }),
    knex.schema.createTableIfNotExists('auths', (table) => {
      table.increments('id').unsigned().primary();
      table.string('type', 8).notNullable();
      table.string('oauth_id', 30).nullable();
      table.string('password', 100).nullable();
      table.string('salt', 100).nullable();
      table.integer('profile_id').references('profiles.id').onDelete('CASCADE');
    }),
    knex.schema.createTableIfNotExists('moments', (table) => {
      table.increments('id').unsigned().primary();
      table.integer('display_type', 1000).notNullable();
      table.string('avg_sentiment', 1000).notNullable();
      table.string('highlight', 1000).nullable();
      table.string('audio_uri', 3000).nullable();
      table.string('text_uri', 3000).nullable();
      table.string('photo_uri', 3000).nullable();
      table.string('cred', 3000).nullable();
      table.timestamps(true, true);
      table.integer('user_id').unsigned();
      table.foreign('user_id').references('profiles.id');
    })
  ]);
};

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('auths'),
    knex.schema.dropTable('moments'),
    knex.schema.dropTable('profiles')
  ]);
};
