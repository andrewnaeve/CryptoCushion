const gql = require('graphql');

const NumbersType = new gql.GraphQLObjectType({
	name: 'NumbersType',
	fields: {
		account: { type: gql.GraphQLFloat },
		account_id: { type: gql.GraphQLString },
		routing: { type: gql.GraphQLFloat },
		wire_routing: { type: gql.GraphQLFloat }
	}
});

module.exports = NumbersType;
