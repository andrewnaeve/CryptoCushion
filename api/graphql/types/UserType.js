const gql = require('graphql');

const UserType = new gql.GraphQLObjectType({
	name: 'UserType',
	fields: () => ({
		id: { type: gql.GraphQLID },
		first_name: { type: gql.GraphQLString },
		last_name: { type: gql.GraphQLString },
		email: { type: gql.GraphQLString }
	})
});

module.exports = UserType;
