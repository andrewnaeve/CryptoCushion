const { ObjectType, String, NonNull } = require('../../../utilities/GraphQLTypeUtilities');

const UserSignInType = ObjectType({
	name: 'UserSignInType',
	fields: () => ({
		email: { type: NonNull(String) },
		password: { type: NonNull(String) }
	})
});

module.exports = UserSignInType;
