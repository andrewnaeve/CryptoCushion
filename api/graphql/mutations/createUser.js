const gql = require('graphql');
const UserType = require('../types/UserType');
const User = require('../../models/user');

module.exports = {
	createUser: {
		type: UserType,
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
		resolve(_, { first_name, last_name, email }) {
			return new User()
				.save({
					first_name: first_name,
					last_name: last_name,
					email: email
				})
				.then(model => {
					const {
						attributes: { first_name, last_name, email, id }
					} = model;
					return {
						first_name: first_name,
						last_name: last_name,
						email: email,
						id: id
					};
				});
		}
	}
};
