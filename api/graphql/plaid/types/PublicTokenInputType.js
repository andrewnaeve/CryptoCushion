const { InputObjectType, String } = require('../../utilities/GraphQLTypeUtilities');

const PublicTokenInput = InputObjectType({
	name: 'PublicTokenInput',
	fields: () => ({
		email: { type: String },
		public_token: { type: String }
	})
});

module.exports = PublicTokenInput;
