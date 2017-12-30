const gql = require('graphql');
const User = require('../../common/models/user');
const Item = require('../models/item');
const Wreck = require('wreck');
const Boom = require('boom');
const PLAID_URL = require('../../../config.json').plaid[process.env.NODE_ENV].PLAID_URL;
const CLIENT_ID = require('../../../config.json').plaid[process.env.NODE_ENV].PLAID_CLIENT_ID;
const SECRET = require('../../../config.json').plaid[process.env.NODE_ENV].PLAID_SECRET;

const exchangePlaidToken = async token => {
	const options = {
		headers: {
			'content-type': 'application/json'
		},
		payload: {
			client_id: CLIENT_ID,
			secret: SECRET,
			public_token: token
		},
		json: 'true'
	};
	const { payload } = await Wreck.post(`${PLAID_URL}/item/public_token/exchange}`, options);
	return payload;
};

module.exports = {
	exchangeToken: {
		type: gql.GraphQLBoolean,
		args: {
			email: {
				type: new gql.GraphQLNonNull(gql.GraphQLString)
			},
			public_token: {
				type: new gql.GraphQLNonNull(gql.GraphQLString)
			}
		},
		resolve: async (_, { email, public_token }) => {
			const token = await exchangePlaidToken(public_token);
			if (!token) {
				return Boom.notFound('Exchange token failed.');
			}
			const { access_token, item_id, request_id } = token;
			new User({
				email: email
			})
				.fetch({
					columns: 'id'
				})
				.then(model => {
					return model.get('id');
				})
				.then(id => {
					new Item({
						user_id: id
					})
						.fetch()
						.then(result => {
							if (result === null) {
								Item.save({
									user_id: id,
									access_token: access_token,
									item_id: item_id
								});
							} else {
								Item.where({
									user_id: id
								}).save(
									{
										access_token: access_token,
										item_id: item_id
									},
									{
										patch: true
									}
								);
							}
						});
				});
		}
	}
};
