const gql = require('graphql');
const userQueries = require('./common/user/userQueries');
const userMutations = require('./common/user/userMutations');
const plaidMutations = require('./plaid/plaidMutations');
const plaidQueries = require('./plaid/plaidQueries');
const coinbaseMutations = require('./coinbase/coinbaseMutations');

const schema = new gql.GraphQLSchema({
	query: new gql.GraphQLObjectType({
		name: 'RootQueryType',
		fields: () => ({
			...userQueries,
			...plaidQueries
		})
	}),
	mutation: new gql.GraphQLObjectType({
		name: 'RootMutationType',
		fields: () => ({
			...userMutations,
			...plaidMutations,
			...coinbaseMutations
		})
	})
});

module.exports = schema;
