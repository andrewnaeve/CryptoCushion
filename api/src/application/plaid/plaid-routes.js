const Boom = require('boom');

module.exports = () => [
	{
		method: 'POST',
		path: '/get_access_token',
		handler: (request, reply) => {
			reply('Hello');
			console.log('yo');
			// const PUBLIC_TOKEN = request.body.public_token;
			// plaidClient.exchangePublicToken(PUBLIC_TOKEN, function(
			// 	err,
			// 	tokenResponse
			// ) {
			// 	if (err !== null) {
			// 		console.log(
			// 			'Could not exchange public_token!' + '\n' + err
			// 		);
			// 		return reply({ err: msg });
			// 	}
			// 	ACCESS_TOKEN = tokenResponse.access_token;
			// 	ITEM_ID = tokenResponse.item_id;
			// 	console.log('access token: ', ACCESS_TOKEN);
			// 	console.log('access token: ', ITEM_ID);
			// });
		},
		config: {
			tags: ['api'],
			description: 'get public token'
		}
	}
];

module.exports['@singleton'] = true;
module.exports['@require'] = ['plaidClient'];
