const Boom = require('boom');

module.exports = [
	{
		method: 'GET',
		path: '/get_access_token',
		handler: (request, reply) => {
			let token = request.payload;
			console.log('token', token);
			return 'you';
		}
	},
	{
		method: 'GET',
		path: '/hi',
		handler: function(request, h) {
			return 'fuck';
		}
	}
];
