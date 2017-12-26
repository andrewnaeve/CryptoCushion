const gql = require('graphql');

const AccountType = new gql.GraphQLObjectType({
	name: 'AccountType',
	fields: () => ({
		account_id: { type: gql.GraphQLString },
		balances: {
			type: new gql.GraphQLObjectType({
				name: 'Balance',
				fields: {
					available: {
						type: gql.GraphQLFloat
					},
					current: { type: gql.GraphQLFloat },
					limit: { type: gql.GraphQLFloat }
				}
			})
		},
		mask: { type: gql.GraphQLString },
		name: { type: gql.GraphQLString },
		subtype: { type: gql.GraphQLString }
	})
});

module.exports = AccountType;
