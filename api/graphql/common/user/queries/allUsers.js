const { List } = require('../../../utilities/GraphQLTypeUtilities');
const UserType = require('../types/UserType');
const { getAllUsers } = require('../db/queries');

module.exports = {
	allUsers: {
		type: List(UserType),
		resolve: async () => {
			const allUsers = await getAllUsers();
			return allUsers;
		}
	}
};
