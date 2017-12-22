exports.seed = function(knex, Promise) {
	// Deletes ALL existing entries
	return knex('users')
		.del()
		.then(function() {
			// Inserts seed entries
			return knex('users').insert([
				{
					'First Name': 'Andrew',
					'Last Name': 'Naeve',
					email: 'arnaeve@gmail.com'
				},
				{
					'First Name': 'Jim',
					'Last Name': 'Jam',
					email: 'JimJam@gmail.com'
				}
			]);
		});
};
