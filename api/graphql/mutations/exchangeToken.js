const gql = require('graphql');
const ItemType = require('../types/ItemType');
const User = require('../../models/user');
const Item = require('../../models/Item');
const Wreck = require('wreck');

module.exports = {
	exchangeToken: {
		type: ItemType,
		args: {
			email: { type: new gql.GraphQLNonNull(gql.GraphQLString) },
			public_token: {
				type: new gql.GraphQLNonNull(gql.GraphQLString)
			}
		},
		resolve(_, { email, public_token }) {
			return Promise.resolve(exchangeToken(public_token)).then(data => {
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
									access_token: data.access_token,
									item_id: data.item_id
								});
							} else {
								Item.where({ user_id: id }).save(
									{
										access_token: data.access_token,
										item_id: data.item_id
									},
									{ patch: true }
								);
							}
						});
					});
			});
		}
	}
};

const exchangeToken = token => {
	const options = {
		headers: { 'content-type': 'application/json' },
		payload: {
			client_id: process.env.PLAID_CLIENT_ID,
			secret: process.env.PLAID_SECRET,
			public_token: token
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
			return {
				access_token: payload.access_token,
				item_id: payload.item_id
			};
		}
	);
};
