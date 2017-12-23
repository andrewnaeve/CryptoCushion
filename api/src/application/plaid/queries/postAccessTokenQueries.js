'use strict';
const Boom = require('boom');
const Wreck = require('wreck');
const Item = require('../../../../models/item.js');
const User = require('../../../../models/user.js');

const saveItem = (email, access_token, item_id) => {
	new User({ email: email })
		.fetch({ columns: 'id' })
		.then(model => {
			return model.get('id');
		})
		.then(id => {
			return new Item().save({
				access_token: access_token,
				item_id: item_id,
				user_id: id
			});
		})
		.then(model => {
			return model;
		});
};

const exchangeToken = (request, reply) => {
	const options = {
		headers: { 'content-type': 'application/json' },
		payload: {
			client_id: process.env.PLAID_CLIENT_ID,
			secret: process.env.PLAID_SECRET,
			public_token: request.payload.publicToken
		},
		json: 'true'
	};
	Wreck.post(
		'https://sandbox.plaid.com/item/public_token/exchange',
		options,
		(error, response, payload) => {
			if (error) {
				return Boom.notFound('Public Token Not Found');
			}
			saveItem('JimJam@gmail.com', payload.access_token, payload.item_id);
		}
	);
};

module.exports = {
	exchangeToken
};
