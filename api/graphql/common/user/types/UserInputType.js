const gql = require('graphql');

const UserInputType = new gql.GraphQLInputObjectType({
	name: 'UserInputType',
	fields: () => ({
		id: { type: gql.GraphQLID },
		first_name: { type: gql.GraphQLString },
		last_name: { type: gql.GraphQLString },
		email: { type: gql.GraphQLString }
	})
});

module.exports = UserInputType;
