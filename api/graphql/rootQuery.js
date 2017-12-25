const gql = require('graphql');
const { allUsers } = require('./queries/allUsers');
const { userByEmail } = require('./queries/userByEmail');
const { getTransactions } = require('./queries/getTransactions');
const { getAccountBalances } = require('./queries/getAccountBalances');
const { getAuth } = require('./queries/getAuth');

module.exports = {
	query: new gql.GraphQLObjectType({
		name: 'RootQueryType',
		fields: () => ({
			allUsers,
			userByEmail,
			getTransactions,
			getAccountBalances,
			getAuth
		})
	})
};
