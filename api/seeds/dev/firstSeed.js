exports.seed = function(knex, Promise) {
	// Deletes ALL existing entries
	return knex('users')
		.del()
		.then(function() {
			return knex('users').insert([
				{
					first_name: 'Andrew',
					last_name: 'Naeve',
					email: 'arnaeve@gmail.com'
				},
				{
					first_name: 'Jim',
					last_name: 'Jam',
					email: 'JimJam@gmail.com'
				},
				{
					first_name: 'Matt',
					last_name: 'Billings',
					email: 'mbillings@gmail.com'
				}
			]);
		})
		.then(function() {
			return knex('items').insert([
				{
					user_id: 1,
					access_token:
						'access-sandbox-286e029d-b3cd-4681-9d88-9a6efa2bf924',
					item_id: 'Qd5rMNNKeqSW5oa1Mmm6ceme88KEDkF9e9vwLb'
				},
				{
					user_id: 2,
					access_token:
						'access-sandbox-db787113-24d4-4a5d-852a-64048b6e1669',
					item_id: 'L3De93Azwxh4KaN5LpZJTRx93X1pLDH1ymPnw6'
				}
			]);
		});
};
