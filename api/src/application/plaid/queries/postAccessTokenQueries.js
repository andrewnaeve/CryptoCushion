'use strict';
const boom = require('boom');
const Wreck = require('wreck');

const exchangeToken = async (request, reply) => {
	const options = {
		headers: { 'content-type': 'application/json' },
		payload: {
			client_id: process.env.PLAID_CLIENT_ID,
			secret: process.env.PLAID_SECRET,
			public_token: request.payload.publicToken
		},
		json: 'true'
	};
	const details = await Wreck.post(
		'https://sandbox.plaid.com/item/public_token/exchange',
		options,
		(error, response, payload) => {
			if (error) {
				Boom.notFound('Public Token Not Found');
			}
			return {
				access_token: payload.access_token,
				item_id: payload.item_id,
				request_id: payload.request
			};
		}
	);
	console.log(details);
};

module.exports = {
	exchangeToken
};
