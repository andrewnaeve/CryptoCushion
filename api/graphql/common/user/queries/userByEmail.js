const { NonNull, String } = require('../../../utilities/GraphQLTypeUtilities');
const Boom = require('boom');
const UserType = require('../types/UserType');
const { userByEmail } = require('../db/queries');

module.exports = {
	userByEmail: {
		type: UserType,
		args: {
			email: { type: NonNull(String) }
		},
		resolve: async (_, { email }) => {
			const userInfo = await userByEmail(email);
			if (!userInfo) {
				return Boom.notFound('User not found');
			}
			return userInfo;
		}
	}
};
