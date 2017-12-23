const gql = require('graphql');
const { userByEmail } = require('./queries/userByEmail');
const { createUser } = require('./mutations/createUser');
const { createItem } = require('./mutations/createItem');

const schema = new gql.GraphQLSchema({
	query: new gql.GraphQLObjectType({
		name: 'RootQueryType',
		fields: {
			userByEmail
		}
	}),
	mutation: new gql.GraphQLObjectType({
		name: 'RootMutationType',
		fields: {
			createUser,
			createItem
		}
	})
});

module.exports = schema;
