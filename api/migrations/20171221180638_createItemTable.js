exports.up = function(knex, Promise) {
	return knex.schema.createTable('items', function(table) {
		table.increments('id').primary();
		table
			.integer('user_id')
			.unsigned()
			.notNullable()
			.references('id')
			.inTable('users');
		table.string('Access_Token').notNullable();
		table.string('Item_Id').notNullable();
	});
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTableIfExists('items');
};
