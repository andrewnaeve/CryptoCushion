const { Boolean } = require('../../utilities/GraphQLTypeUtilities');
const UserSignInInputType = require('../types/UserSignInInputType');
const UserSignInOutputType = require('../types/UserSignInOutputType');
const { comparePassword } = require('../db/queries');

module.exports = {
	signIn: {
		type: UserSignInOutputType,
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
