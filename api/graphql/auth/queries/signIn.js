const { Boolean } = require('../../utilities/GraphQLTypeUtilities');
const UserSignInInputType = require('../types/UserSignInInputType');
const { comparePassword } = require('../db/queries');

module.exports = {
	signIn: {
		type: Boolean,
		args: {
			user: {
				type: UserSignInInputType
			}
		},
		resolve: async (_, { user: { email, password } }) => {
			return await comparePassword(email, password);
		}
	}
};
