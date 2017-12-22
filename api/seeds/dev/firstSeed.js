exports.seed = function(knex, Promise) {
	// Deletes ALL existing entries
	return knex('users')
		.del()
		.then(function() {
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
				},
				{
					'First Name': 'Matt',
					'Last Name': 'Billings',
					email: 'mbillings@gmail.com'
				}
			]);
		})
		.then(function() {
			return knex('items').insert([
				{
					user_id: 1,
					'Access Token':
						'access-sandbox-286e029d-b3cd-4681-9d88-9a6efa2bf924',
					'Item Id': 'Qd5rMNNKeqSW5oa1Mmm6ceme88KEDkF9e9vwLb'
				},
				{
					user_id: 2,
					'Access Token':
						'access-sandbox-db787113-24d4-4a5d-852a-64048b6e1669',
					'Item Id': 'L3De93Azwxh4KaN5LpZJTRx93X1pLDH1ymPnw6'
				}
			]);
		});
};
