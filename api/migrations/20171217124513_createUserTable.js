exports.up = function(knex, Promise) {
	return knex.schema.createTable('users', function(usersTable) {
		usersTable.increments();
		usersTable.string('First Name').notNullable();
		usersTable.string('Last Name').notNullable();
		usersTable
			.string('Email Name')
			.notNullable()
			.unique();
		usersTable.timestamp('created_at').notNullable();
	});
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTableIfExists('users');
};
