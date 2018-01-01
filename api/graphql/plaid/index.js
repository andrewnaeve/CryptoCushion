const { exchangePlaidPublicToken } = require('./mutations/exchangePlaidToken');
const { getAccountBalances } = require('./queries/getAccountBalances');
const { getAuth } = require('./queries/getAuth');
const { getTransactions } = require('./queries/getTransactions');

exports.plaidQueries = {
	getAccountBalances,
	getAuth,
	getTransactions
};

exports.plaidMutations = {
	exchangePlaidPublicToken
};
