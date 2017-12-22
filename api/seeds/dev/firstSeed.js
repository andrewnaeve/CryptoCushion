exports.seed = function(knex, Promise) {
	// Deletes ALL existing entries
	return knex('users')
		.del()
		.then(function() {
			return knex('users').insert([
				{
					First_Name: 'Andrew',
					Last_Name: 'Naeve',
					Email: 'arnaeve@gmail.com'
				},
				{
					First_Name: 'Jim',
					Last_Name: 'Jam',
					Email: 'JimJam@gmail.com'
				},
				{
					First_Name: 'Matt',
					Last_Name: 'Billings',
					Email: 'mbillings@gmail.com'
				}
			]);
		})
		.then(function() {
			return knex('items').insert([
				{
					user_id: 1,
					Access_Token:
						'access-sandbox-286e029d-b3cd-4681-9d88-9a6efa2bf924',
					Item_Id: 'Qd5rMNNKeqSW5oa1Mmm6ceme88KEDkF9e9vwLb'
				},
				{
					user_id: 2,
					Access_Token:
						'access-sandbox-db787113-24d4-4a5d-852a-64048b6e1669',
					Item_Id: 'L3De93Azwxh4KaN5LpZJTRx93X1pLDH1ymPnw6'
				}
			]);
		});
};
