const gql = require('graphql');
const UserType = require('../types/UserType');
const User = require('../../models/user');
const Boom = require('boom');

module.exports = {
	userByEmail: {
		type: UserType,
		args: {
			email: { type: new gql.GraphQLNonNull(gql.GraphQLString) }
		},
		resolve(_, { email }) {
			return new User({ email: email })
				.fetch({
					columns: ['id', 'first_name', 'last_name']
				})
				.then(model => {
					const { attributes: { id, first_name, last_name } } = model;
					return {
						id: id,
						first_name: first_name,
						last_name: last_name
					};
				});
		}
	}
};
