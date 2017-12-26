const gql = require('graphql');
const plaidQueries = require('./plaid/plaidQueries');

module.exports = {
	query: new gql.GraphQLObjectType({
		name: 'RootQueryType',
		fields: () => ({
			...plaidQueries
		})
	})
};
