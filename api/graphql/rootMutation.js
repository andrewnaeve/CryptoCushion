const gql = require('graphql');
const plaidMutations = require('./plaid/plaidMutations');

module.exports = {
	mutation: new gql.GraphQLObjectType({
		name: 'RootMutationType',
		fields: () => ({
			...plaidMutations
		})
	})
};
