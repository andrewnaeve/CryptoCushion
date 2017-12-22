const User = require('../models/user');

const resolvers = models => ({
	Query: {
		getUserById(root, { id }) {
			return new User({ id: id }).fetch().then(response => response);
		},

		getUserByEmail(root, { email }) {
			return new User({ email: email })
				.fetch()
				.then(response => response);
		}
	}
});

module.exports = resolvers;
