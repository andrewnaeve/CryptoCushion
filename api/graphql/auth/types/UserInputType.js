const { InputObjectType, String } = require('../../../utilities/GraphQLTypeUtilities');

const UserInputType = InputObjectType({
	name: 'UserInfoInputType',
	fields: () => ({
		first_name: { type: String },
		last_name: { type: String },
		email: { type: String },
		password: { type: String }
	})
});

module.exports = UserInputType;
