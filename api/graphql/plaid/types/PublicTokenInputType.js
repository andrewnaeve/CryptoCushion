const gql = require('graphql');

const PublicTokenInput = new gql.GraphQLInputObjectType({
	name: 'PublicTokenInput',
	fields: () => ({
		email: { type: gql.GraphQLString },
		public_token: { type: gql.GraphQLString }
	})
});

module.exports = PublicTokenInput;
