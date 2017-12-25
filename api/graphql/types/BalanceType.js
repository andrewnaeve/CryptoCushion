const gql = require('graphql');

const BalanceType = new gql.GraphQLObjectType({
	name: 'BalanceType',
	fields: () => ({
		account_id: { type: gql.GraphQLString },
		balances: {
			type: new gql.GraphQLObjectType({
				name: 'BalanceObject',
				fields: {
					available: { type: gql.GraphQLFloat },
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

module.exports = BalanceType;
