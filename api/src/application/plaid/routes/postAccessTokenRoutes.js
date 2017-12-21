const Boom = require('boom');
const payloadValidator = require('../validation/postAccessTokenValidation')
	.payloadValidator;

module.exports = [
	{
		method: 'POST',
		path: '/getAccessToken',
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
