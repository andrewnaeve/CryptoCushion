const gql = require('graphql');
const UserType = require('../types/UserType');
const User = require('../../models/user');
const Item = require('../../models/item');

module.exports = {
	allUsers: {
		type: new gql.GraphQLList(UserType),
		resolve: () => {
			return new User().fetchAll().then(data => {
				return data.map(x => {
					return {
						id: x.attributes.id,
						first_name: x.attributes.first_name,
						last_name: x.attributes.last_name,
						email: x.attributes.email
					};
				});
			});
		}
	}
};
