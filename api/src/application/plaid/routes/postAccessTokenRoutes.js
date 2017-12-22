const Boom = require('boom');
const Wreck = require('wreck');
const payloadValidator = require('../validation/postAccessTokenValidation')
	.payloadValidator;
const exchangeToken = require('../queries/postAccessTokenQueries')
	.exchangeToken;

module.exports = [
	{
		method: 'POST',
		path: '/getAccessToken',
		config: {
			handler: (request, reply) => {
				exchangeToken(request, reply);
				reply();
			}
			validate: {
				payload: payloadValidator
			}
		}
	}
];
