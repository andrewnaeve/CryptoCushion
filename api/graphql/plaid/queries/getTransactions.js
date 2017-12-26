const gql = require('graphql');
const moment = require('moment');
const TransactionType = require('../types/TransactionType');
const User = require('../../../models/user');
const Item = require('../../../models/item');
const Wreck = require('wreck');
const Boom = require('boom');
const plaidUrl = require('../../utilities/plaidUrl')[process.env.NODE_ENV][
	'url'
];

module.exports = {
	getTransactions: {
		type: new gql.GraphQLList(TransactionType),
		args: {
			access_token: { type: new gql.GraphQLNonNull(gql.GraphQLString) }
		},
		resolve: async (_, { access_token }) => {
			const transactions = await fetchTransactions(access_token);
			if (!transactions) {
				return Boom.notFound('Transaction lookup failed.', error);
			}
			return transactions.map(x => {
				return {
					account_id: x.account_id,
					amount: x.amount,
					category: x.category,
					date: x.date,
					name: x.name,
					pending: x.pending,
					transaction_id: x.transaction_id,
					transaction_type: x.transaction_type
				};
			});
		}
	}
};

const getTodaysDate = () => {
	return moment().format('YYYY-MM-DD');
};

const getTwoWeeksAgo = () => {
	return moment()
		.subtract(14, 'm')
		.format('YYYY-MM-DD');
};

const fetchTransactions = async token => {
	const options = {
		headers: { 'content-type': 'application/json' },
		payload: {
			client_id: process.env.PLAID_CLIENT_ID,
			secret: process.env.PLAID_SECRET,
			access_token: token,
			start_date: getTwoWeeksAgo(),
			end_date: getTodaysDate()
		},
		json: 'true'
	};
	const { payload } = await Wreck.post(
		`${plaidUrl}/transactions/get`,
		options
	);
	const checkingAccountId = payload.accounts.filter(account => {
		if (account.subtype === 'checking') {
			return account.account_id;
		}
	});
	return payload.transactions.filter(result => {
		return result.account_id === checkingAccountId[0].account_id;
	});
};
