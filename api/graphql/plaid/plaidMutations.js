const { createUser } = require('./mutations/createUser');
const { exchangePlaidToken } = require('./mutations/exchangePlaidToken');

module.exports = {
	createUser,
	exchangePlaidToken
};
