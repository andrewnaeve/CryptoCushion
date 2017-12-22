exports.up = function(knex, Promise) {
	return knex.schema.createTable('items', function(table) {
		table.increments('id').primary();
		table
			.integer('user_id')
			.unsigned()
			.notNullable()
			.references('id')
			.inTable('users');
		table.string('Item Id').notNullable();
		table.string('Access Token').notNullable();
	});
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTableIfExists('items');
};
