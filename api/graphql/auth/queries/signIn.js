const { Boolean } = require('../../../utilities/GraphQLTypeUtilities');
const UserSignInType = require('../types/UserSignInType');
const { comparePassword } = require('../db/queries');

module.exports = {
	signUp: {
		type: Boolean,
		args: {
			user: {
				type: UserSignInType
			}
		},
		resolve: async (_, { user: { email, password } }) => {
			return await comparePassword(email, password);
		}
	}
};
