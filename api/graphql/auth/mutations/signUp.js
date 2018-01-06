const { Boolean } = require('../../utilities/GraphQLTypeUtilities');
const UserSignUpInputType = require('../types/UserSignUpInputType');
const { saveUser } = require('../db/queries');

module.exports = {
	signUp: {
		type: Boolean,
		args: {
			user: {
				type: UserSignUpInputType
			}
		},
		resolve: (_, { user: { first_name, last_name, email, password } }) => {
			return saveUser(first_name, last_name, email, password);
		}
	}
};
