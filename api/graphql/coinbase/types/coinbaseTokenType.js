const { InputObjectType, String, Int } = require('../../utilities/GraphQLTypeUtilities');

const TokenType = InputObjectType({
	name: 'TokenType',
	fields: () => ({
		access_token: { type: String },
		token_type: { type: String },
		expires_in: { type: Int },
		refresh_token: { type: String },
		scope: { type: String }
	})
});

module.exports = TokenType;
