const gql = require('graphql');
const { allUsers } = require('./queries/allUsers');
const { userByEmail } = require('./queries/userByEmail');
const { getTransactions } = require('./queries/getTransactions');
const { getAccountBalances } = require('./queries/getAccountBalances');
const { getAuth } = require('./queries/getAuth');

const rootQuery = new gql.GraphQLObjectType({
	name: 'RootQuery',
	fields: () => ({
		allUsers,
		userByEmail,
		getTransactions,
		getAccountBalances,
		getAuth
	})
});

module.exports = rootQuery;
