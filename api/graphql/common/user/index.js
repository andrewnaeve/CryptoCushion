const { allUsers } = require('./queries/allUsers');
const { userByEmail } = require('./queries/userByEmail');
const { createUser } = require('./mutations/createUser');

exports.userQueries = {
	allUsers,
	userByEmail
};

exports.userMutations = {
	createUser
};
