const gql = require('graphql');

const UserType = new gql.GraphQLObjectType({
	name: 'UserType',
	fields: {
		id: { type: gql.GraphQLID },
		first_name: { type: new gql.GraphQLNonNull(gql.GraphQLString) },
		last_name: { type: new gql.GraphQLNonNull(gql.GraphQLString) },
		email: { type: new gql.GraphQLNonNull(gql.GraphQLString) }
	}
});

module.exports = UserType;
