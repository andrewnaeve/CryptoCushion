exports.up = function (knex, Promise) {
  return knex.schema.createTable('coinbase_tokens', function (table) {
    table.increments('id').primary()
    table
      .integer('user_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('users')
    table.string('access_token').notNullable()
    table.string('token_type').notNullable()
    table.integer('expires_in').notNullable()
    table.string('refresh_token').notNullable()
    table.string('scope').notNullable()
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('coinbase_tokens')
}
