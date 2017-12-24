const gql = require('graphql');
// queries
const { allUsers } = require('./queries/allUsers');
const { userByEmail } = require('./queries/userByEmail');
const { getTransactions } = require('./queries/getTransactions');
const { getAccountBalances } = require('./queries/getAccountBalances');
const { getAuth } = require('./queries/getAuth');
// mutations
const { createUser } = require('./mutations/createUser');
const { exchangeToken } = require('./mutations/exchangeToken');

const schema = new gql.GraphQLSchema({
	query: new gql.GraphQLObjectType({
		name: 'RootQueryType',
		fields: {
			allUsers,
			userByEmail,
			getTransactions,
			getAccountBalances,
			getAuth
		}
	}),
	mutation: new gql.GraphQLObjectType({
		name: 'RootMutationType',
		fields: {
			createUser,
			exchangeToken
		}
	})
});

module.exports = schema;
