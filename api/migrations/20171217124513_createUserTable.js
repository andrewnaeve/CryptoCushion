exports.up = function(knex, Promise) {
	return knex.schema.createTable('users', function(table) {
		table.increments('id').primary();
		table.string('First_Name').notNullable();
		table.string('Last_Name').notNullable();
		table
			.string('Email')
			.notNullable()
			.unique();
		table.timestamp('created_at').notNullable();
	});
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTableIfExists('users');
};
