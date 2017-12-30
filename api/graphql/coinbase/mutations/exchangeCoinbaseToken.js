const gql = require('graphql');
const User = require('../../../models/user');
const Item = require('../../../models/Item');
const Wreck = require('wreck');
const Boom = require('boom');
const COINBASE_URL = require('../../../config.json').coinbase[process.env.NODE_ENV].COINBASE_URL;
const COINBASE_CLIENT_ID = require('../../../config.json').coinbase[process.env.NODE_ENV]
	.COINBASE_CLIENT_ID;
const COINBASE_CLIENT_SECRET = require('../../../config.json').coinbase[process.env.NODE_ENV]
	.COINBASE_CLIENT_SECRET;
const COINBASE_REDIRECT_URI = require('../../../config.json').coinbase[process.env.NODE_ENV]
	.COINBASE_REDIRECT_URI;

const exchangeToken = async code => {
	const options = {
		headers: {
			'content-type': 'application/json'
		},
		payload: {
			grant_type: 'authorization_code',
			code: code,
			client_id: COINBASE_CLIENT_ID,
			secret: COINBASE_CLIENT_SECRET,
			redirect_uri: COINBASE_REDIRECT_URI
		},
		json: 'true'
	};
	const { payload } = await Wreck.post(`${COINBASE_URL}/item/public_token/exchange}`, options);
	return payload;
};

module.exports = {
	exchangeToken: {
		type: gql.GraphQLBoolean,
		args: {
			email: {
				type: new gql.GraphQLNonNull(gql.GraphQLString)
			},
			code: {
				type: new gql.GraphQLNonNull(gql.GraphQLString)
			}
		},
		resolve: async (_, { email, code }) => {
			const token = await exchangeToken(code);
			if (!token) {
				return Boom.notFound('Exchange token failed.');
			}
			const { access_token, token_type, expires_in, refresh_token, scope } = token;
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
