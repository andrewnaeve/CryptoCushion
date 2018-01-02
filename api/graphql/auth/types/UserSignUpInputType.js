const { InputObjectType, String, NonNull } = require('../../../utilities/GraphQLTypeUtilities');

const UserSignUpInputType = InputObjectType({
	name: 'UserSignUpInputType',
	fields: () => ({
		first_name: { type: NonNull(String) },
		last_name: { type: NonNull(String) },
		email: { type: NonNull(String) },
		password: { type: NonNull(String) }
	})
});

module.exports = UserSignUpInputType;
