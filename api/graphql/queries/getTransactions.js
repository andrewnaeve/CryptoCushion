const gql = require('graphql');
const moment = require('moment');
const TransactionType = require('../types/TransactionType');
const User = require('../../models/user');
const Item = require('../../models/item');
const Wreck = require('wreck');

module.exports = {
	getTransactions: {
		type: new gql.GraphQLList(TransactionType),
		args: {
			email: { type: new gql.GraphQLNonNull(gql.GraphQLString) }
		},
		resolve(_, { email }) {
			return Promise.resolve(getAccessToken(email))
				.then(data => {
					const token = data.access_token;
					return fetchTransactions(token);
				})
				.then(response => {
					return response.map(x => {
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
				});
		}
	}
};

const getTodaysDate = () => {
	return moment().format('YYYY-MM-DD');
};

const getOneWeekAgo = () => {
	return moment()
		.subtract(1, 'm')
		.format('YYYY-MM-DD');
};

const getAccessToken = email => {
	return new User({ email: email }).fetch({ columns: 'id' }).then(model => {
		const { attributes: { id } } = model;
		return new Item({ user_id: id })
			.fetch({ columns: 'access_token' })
			.then(result => {
				const { attributes: { access_token } } = result;
				return {
					access_token: access_token
				};
			});
	});
};

const fetchTransactions = token => {
	const options = {
		headers: { 'content-type': 'application/json' },
		payload: {
			client_id: process.env.PLAID_CLIENT_ID,
			secret: process.env.PLAID_SECRET,
			access_token: token,
			start_date: getOneWeekAgo(),
			end_date: getTodaysDate()
		},
		json: 'true'
	};

	return new Promise(resolve => {
		Wreck.post(
			'https://sandbox.plaid.com/transactions/get',
			options,
			(error, response, payload) => {
				if (error) {
					return Boom.notFound('Public Token Not Found');
				}

				const checkingAccountId = payload.accounts.filter(account => {
					if (account.subtype === 'checking') {
						return account.account_id;
					}
				});

				resolve(
					payload.transactions.filter(result => {
						return (
							result.account_id ===
							checkingAccountId[0].account_id
						);
					})
				);
			}
		);
	});
};
