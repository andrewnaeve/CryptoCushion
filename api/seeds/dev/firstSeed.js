exports.seed = function(knex, Promise) {
	// Deletes ALL existing entries
	return knex('users')
		.del()
		.then(() => {
			return knex('users').insert([
				{
					first_name: 'Andrew',
					last_name: 'Naeve',
					email: 'arnaeve@gmail.com'
				},
				{
					first_name: 'Matt',
					last_name: 'Billings',
					email: 'mbillings@gmail.com'
				},
				{
					first_name: 'Ham',
					last_name: 'Sandwhich',
					email: 'hamsandwhich@gmail.com'
				},
				{
					first_name: 'Jim',
					last_name: 'Jam',
					email: 'JimJam@gmail.com'
				}
			]);
		})
		.then(() => {
			return knex('items').insert([
				{
					user_id: 1,
					access_token: 'access-sandbox-286e029d-b3cd-4681-9d88-9a6efa2bf924',
					item_id: 'Qd5rMNNKeqSW5oa1Mmm6ceme88KEDkF9e9vwLb'
				},
				{
					user_id: 2,
					access_token: 'access-sandbox-db787113-24d4-4a5d-852a-64048b6e1669',
					item_id: 'L3De93Azwxh4KaN5LpZJTRx93X1pLDH1ymPnw6'
				}
			]);
		})
		.then(() => {
			return knex('coinbase_tokens').insert([
				{
					user_id: 1,
					access_token:
						'ffda0317e0ea101a68edff041428267bc91b7fe51c8b41e5399e6aa1c63be2be',
					token_type: 'bearer',
					expires_in: 7200,
					refresh_token:
						'ab2acff534f48eee64e9769c83412f8427ddb90980be2acc904b161d43dfe7c3',
					scope: 'wallet:user:read wallet:accounts:read'
				},
				{
					user_id: 2,
					access_token:
						'cd7ce1b767e650a70c549f47d8b73b6c90f3d01262d3bad458eb2fba2a64c45e',
					token_type: 'bearer',
					expires_in: 7200,
					refresh_token:
						'954442c2b4f8bdb307fc8bb19d7bd4fb08d93b9a764dc62c453cd0387bbcea41',
					scope: 'wallet:user:read wallet:accounts:read'
				}
			]);
		});
};
