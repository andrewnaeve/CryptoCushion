const { ObjectType, String, ID } = require('../../../utilities/GraphQLTypeUtilities');

const UserInfoType = ObjectType({
	name: 'UserInfoType',
	fields: () => ({
		id: { type: ID },
		first_name: { type: String },
		last_name: { type: String },
		email: { type: String }
	})
});

module.exports = UserInfoType;
