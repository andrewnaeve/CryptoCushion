const gql = require('graphql');
const plaidMutations = require('./plaid/plaidMutations');
const plaidQueries = require('./plaid/plaidQueries');

const schema = new gql.GraphQLSchema({
	query: new gql.GraphQLObjectType({
		name: 'RootQueryType',
		fields: () => ({
			plaidQueries
		})
	}),
	mutation: new gql.GraphQLObjectType({
		name: 'RootMutationType',
		fields: () => ({
			plaidMutations
		})
	})
});

module.exports = schema;
