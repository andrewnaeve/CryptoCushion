const gql = require('graphql');
const UserInputType = require('../types/UserInputType');
const { createUser } = require('../models/userMethods');

module.exports = {
	createUser: {
		type: UserInputType,
		args: {
			first_name: {
				type: new gql.GraphQLNonNull(gql.GraphQLString)
			},
			last_name: {
				type: new gql.GraphQLNonNull(gql.GraphQLString)
			},
			email: {
				type: new gql.GraphQLNonNull(gql.GraphQLString)
			}
		},
		resolve: (_, { first_name, last_name, email }) => {
			createUser(first_name, last_name, email);
		}
	}
};
