const { ObjectType, String, ID } = require('../../utilities/GraphQLTypeUtilities');

const UserSignUpOutputType = ObjectType({
	name: 'UserSignUpOutputType',
	fields: () => ({
		result: { type: String },
		id: { type: ID },
		email: { type: String }
	})
});

module.exports = UserSignUpOutputType;
