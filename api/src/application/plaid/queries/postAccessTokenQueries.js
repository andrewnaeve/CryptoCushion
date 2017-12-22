'use strict';
const boom = require('boom');
const Wreck = require('wreck');
const Item = require('../../../../models/item.js');
const User = require('../../../../models/user.js');

const saveItem = (email, access_token, item_id) => {
	new User({ email: email })
		.fetch()
		.then(model => {
			return model.get('id');
		})
		.then(id => {
			return new Item().save({
				'Access Token': access_token,
				'Item Id': item_id,
				user_id: id
			});
		})
		.then(model => {
			console.log('model', model);
		});
};

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
	try {
		await Wreck.post(
			'https://sandbox.plaid.com/item/public_token/exchange',
			options,
			(error, response, payload) => {
				if (error) {
					return Boom.notFound('Public Token Not Found');
				}
				saveItem(
					'JimJam@gmail.com',
					payload.access_token,
					payload.item_id
				);
				return {
					access_token: payload.access_token,
					item_id: payload.item_id,
					request_id: payload.request_id
				};
			}
		);
	} catch (err) {
		console.log('wreck error');
	}
};

module.exports = {
	exchangeToken
};
