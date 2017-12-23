const gql = require('graphql');

const ItemType = new gql.GraphQLObjectType({
	name: 'ItemType',
	fields: {
		id: { type: gql.GraphQLID },
		user_id: { type: gql.GraphQLInt },
		access_token: { type: gql.GraphQLString },
		item_id: { type: gql.GraphQLString }
	}
});

module.exports = ItemType;
