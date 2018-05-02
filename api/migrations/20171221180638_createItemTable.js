exports.up = function (knex, Promise) {
  return knex.schema.createTable('items', function (table) {
    table.increments('id').primary()
    table
      .integer('user_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('users')
    table.string('access_token').notNullable()
    table.string('item_id').notNullable()
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('items')
}
