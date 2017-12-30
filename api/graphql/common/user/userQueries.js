const { allUsers } = require('./queries/allUsers');
const { userByEmail } = require('./queries/userByEmail');

module.exports = {
	allUsers,
	userByEmail
};
