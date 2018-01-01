const { ObjectType, String, ID } = require('../../../utilities/GraphQLTypeUtilities');

const UserType = ObjectType({
	name: 'UserType',
	fields: () => ({
		id: { type: ID },
		first_name: { type: String },
		last_name: { type: String },
		email: { type: String }
	})
});

module.exports = UserType;
