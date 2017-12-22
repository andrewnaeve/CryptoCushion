const Boom = require('boom');
const Wreck = require('wreck');
const { payloadValidator } = require('../validation/postAccessTokenValidation');
const { exchangeToken } = require('../queries/postAccessTokenQueries');

module.exports = [
	{
		method: 'POST',
		path: '/getAccessToken',
		config: {
			handler: (request, reply) => {
				exchangeToken(request, reply);
				reply();
			},
			validate: {
				payload: payloadValidator
			}
		}
	}
];
