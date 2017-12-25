const gql = require('graphql');
const ItemType = require('../types/ItemType');
const User = require('../../models/user');
const Item = require('../../models/Item');
const Wreck = require('wreck');
const Boom = require('boom');

module.exports = {
	exchangeToken: {
		type: gql.GraphQLBoolean,
		args: {
			email: { type: new gql.GraphQLNonNull(gql.GraphQLString) },
			public_token: {
				type: new gql.GraphQLNonNull(gql.GraphQLString)
			}
		},
		async resolve(_, { email, public_token }) {
			const token = await exchangeToken(public_token);
			if (!token) {
				return Boom.notFound('Exchange token failed.', error);
			}
			const { access_token, item_id, request_id } = token;
			new User({ email: email })
				.fetch({ columns: 'id' })
				.then(model => {
					return model.get('id');
				})
				.then(id => {
					new Item({ user_id: id }).fetch().then(result => {
						if (result === null) {
							Item.save({
								user_id: id,
								access_token: access_token,
								item_id: item_id
							});
						} else {
							Item.where({ user_id: id }).save(
								{
									access_token: access_token,
									item_id: item_id
								},
								{ patch: true }
							);
						}
					});
				});
		}
	}
};

const exchangeToken = async token => {
	const options = {
		headers: { 'content-type': 'application/json' },
		payload: {
			client_id: process.env.PLAID_CLIENT_ID,
			secret: process.env.PLAID_SECRET,
			public_token: token
		},
		json: 'true'
	};
	const { payload } = await Wreck.post(
		'https://sandbox.plaid.com/item/public_token/exchange',
		options
	);
	return payload;
};
