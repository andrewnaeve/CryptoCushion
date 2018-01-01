const { InputObjectType, String, ID } = require('../../../utilities/GraphQLTypeUtilities');

const UserInputType = InputObjectType({
	name: 'UserInputType',
	fields: () => ({
		id: { type: ID },
		first_name: { type: String },
		last_name: { type: String },
		email: { type: String }
	})
});

module.exports = UserInputType;
