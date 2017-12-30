const gql = require('graphql');

const TokenType = new gql.GraphQLInputObjectType({
	name: 'TokenType',
	fields: () => ({
		access_token: { type: gql.GraphQLString },
		token_type: { type: gql.GraphQLString },
		expires_in: { type: gql.GraphQLInt },
		refresh_token: { type: gql.GraphQLString },
		scope: { type: gql.GraphQLString }
	})
});

module.exports = TokenType;
