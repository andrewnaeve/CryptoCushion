const Boom = require('boom');
const payloadValidator = require('../validation/post_access_token')
	.payloadValidator;

module.exports = [
	{
		method: 'POST',
		path: '/get_access_token',
		config: {
			handler: (request, reply) => {
				const token = request.payload;
				if (!token) {
					reply(Boom.badData('Token empty'));
				}
				return reply('token received');
			},
			validate: {
				payload: payloadValidator
			}
		}
	}
];
