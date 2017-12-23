const gql = require('graphql');

const ItemType = new gql.GraphQLObjectType({
	name: 'ItemType',
	fields: {
		id: { type: gql.GraphQLID },
		user_id: { type: new gql.GraphQLNonNull(gql.GraphQLInt) },
		access_token: { type: new gql.GraphQLNonNull(gql.GraphQLString) },
		item_id: { type: new gql.GraphQLNonNull(gql.GraphQLString) }
	}
});

module.exports = ItemType;
