const { List, NonNull, String } = require('../../utilities/GraphQLTypeUtilities');
const moment = require('moment');
const TransactionType = require('../types/TransactionType');
const Wreck = require('wreck');
const Boom = require('boom');
const PLAID_URL = require('../../../config.json').plaid[process.env.NODE_ENV].PLAID_URL;
const CLIENT_ID = require('../../../config.json').plaid[process.env.NODE_ENV].PLAID_CLIENT_ID;
const SECRET = require('../../../config.json').plaid[process.env.NODE_ENV].PLAID_SECRET;

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
			client_id: CLIENT_ID,
			secret: SECRET,
			access_token: token,
			start_date: getTwoWeeksAgo(),
			end_date: getTodaysDate()
		},
		json: 'true'
	};
	try {
		const { payload } = await Wreck.post(`${PLAID_URL}/transactions/get`, options);
		const checkingAccountId = payload.accounts.filter(account => {
			if (account.subtype === 'checking') {
				return account.account_id;
			}
		});
		return payload.transactions.filter(result => {
			return result.account_id === checkingAccountId[0].account_id;
		});
	} catch (error) {
		Boom.badRequest('Cannot get Plaid transactions', error);
	}
};

module.exports = {
	getTransactions: {
		type: List(TransactionType),
		args: {
			access_token: { type: NonNull(String) }
		},
		resolve: async (_, { access_token }) => {
			const transactions = await fetchTransactions(access_token);
			if (!transactions) {
				return Boom.notFound('Transaction lookup failed.');
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
