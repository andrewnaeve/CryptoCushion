const { getAccountBalances } = require('./queries/getAccountBalances');
const { getAuth } = require('./queries/getAuth');
const { getTransactions } = require('./queries/getTransactions');

module.exports = {
	getAccountBalances,
	getAuth,
	getTransactions
};
