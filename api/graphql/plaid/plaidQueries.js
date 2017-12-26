const { allUsers } = require('./queries/allUsers');
const { getAccountBalances } = require('./queries/getAccountBalances');
const { getAuth } = require('./queries/getAuth');
const { getTransactions } = require('./queries/getTransactions');
const { userByEmail } = require('./queries/userByEmail');

module.exports = {
	allUsers,
	getAccountBalances,
	getAuth,
	getTransactions,
	userByEmail
};
