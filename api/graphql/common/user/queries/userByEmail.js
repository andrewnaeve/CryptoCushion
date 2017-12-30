const gql = require('graphql');
const Boom = require('boom');

const UserType = require('../types/UserType');
const { userByEmail } = require('../models/userMethods');

module.exports = {
	userByEmail: {
		type: UserType,
		args: {
			email: { type: new gql.GraphQLNonNull(gql.GraphQLString) }
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
