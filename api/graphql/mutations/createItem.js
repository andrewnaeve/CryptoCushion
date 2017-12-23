const gql = require('graphql');
const ItemType = require('../types/ItemType');
const Item = require('../../models/item');

module.exports = {
	createItem: {
		type: ItemType,
		args: {
			email: {
				type: new gql.GraphQLNonNull(gql.GraphQLString)
			},
			access_token: {
				type: new gql.GraphQLNonNull(gql.GraphQLString)
			},
			item_id: {
				type: new gql.GraphQLNonNull(gql.GraphQLString)
			}
		},
		resolve(_, { email, access_token, item_id }) {
			return Promise.resolve(
				new User({ email: email })
					.fetch({ columns: 'id' })
					.then(id => {
						return new Item().save({
							email,
							access_token,
							item_id
						});
					})
					.then(model => {
						return model;
					})
			);
		}
	}
};
