const gql = require('graphql');
const UserType = require('../types/UserType');
const { getAllUsers } = require('../models/userMethods');

module.exports = {
	allUsers: {
		type: new gql.GraphQLList(UserType),
		resolve: async () => {
			const allUsers = await getAllUsers();
			return allUsers;
		}
	}
};
