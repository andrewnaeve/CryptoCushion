const { createUser } = require('./mutations/createUser');
const { exchangeToken } = require('./mutations/exchangeToken');

module.exports = {
	createUser,
	exchangeToken
};
