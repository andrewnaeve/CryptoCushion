const { List } = require('../../../utilities/GraphQLTypeUtilities');
const UserInfoType = require('../types/UserInfoType');
const { getAllUsers } = require('../db/queries');

module.exports = {
	allUsers: {
		type: List(UserInfoType),
		resolve: async () => {
			const allUsers = await getAllUsers();
			return allUsers;
		}
	}
};
