const gql = require('graphql');

const TransactionType = new gql.GraphQLObjectType({
	name: 'TransactionType',
	fields: {
		account_id: { type: gql.GraphQLString },
		amount: { type: gql.GraphQLFloat },
		category: { type: gql.GraphQLString },
		date: { type: gql.GraphQLString },
		name: { type: gql.GraphQLString },
		pending: { type: gql.GraphQLBoolean },
		transaction_id: { type: gql.GraphQLString },
		transaction_type: { type: gql.GraphQLString }
	}
});

module.exports = TransactionType;
