const { Boolean } = require('../../../utilities/GraphQLTypeUtilities');
const UserInputType = require('../types/UserInputType');
const { createUser } = require('../db/queries');

module.exports = {
	createUser: {
		type: Boolean,
		args: {
			user: {
				type: UserInputType
			}
		},
		resolve: (_, { user: { first_name, last_name, email } }) => {
			createUser(first_name, last_name, email);
		}
	}
};
