exports.up = function(knex, Promise) {
	return knex.schema
		.createTable('users', function(table) {
			table.increments('id').primary();
			table.string('First Name').notNullable();
			table.string('Last Name').notNullable();
			table
				.string('Email')
				.notNullable()
				.unique();
			table.timestamp('created_at').notNullable();
		})
		.then(() => {
			return knex.seed.run();
		});
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTableIfExists('users');
};
