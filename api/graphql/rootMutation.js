const gql = require('graphql');
const { createUser } = require('./mutations/createUser');
const { exchangeToken } = require('./mutations/exchangeToken');

const rootMutation = new gql.GraphQLObjectType({
	name: 'RootMutationType',
	fields: () => ({
		createUser,
		exchangeToken
	})
});

module.exports = rootMutation;
