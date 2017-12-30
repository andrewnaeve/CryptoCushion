const gql = require('graphql');
const UserInputType = require('../types/UserInputType');
const { createUser } = require('../models/userMethods');

module.exports = {
	createUser: {
		type: gql.GraphQLBoolean,
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
