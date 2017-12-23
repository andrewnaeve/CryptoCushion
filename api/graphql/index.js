const gql = require('graphql');
const { allUsers } = require('./queries/allUsers');
const { userByEmail } = require('./queries/userByEmail');
const { createUser } = require('./mutations/createUser');
const { exchangeToken } = require('./mutations/exchangeToken');

const schema = new gql.GraphQLSchema({
	query: new gql.GraphQLObjectType({
		name: 'RootQueryType',
		fields: {
			allUsers,
			userByEmail
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
