const gql = require('graphql');
const BalanceType = require('../types/BalanceType');
const Wreck = require('wreck');
const Boom = require('boom');
const PLAID_URL = require('../../../config.json').plaid[process.env.NODE_ENV].PLAID_URL;
const CLIENT_ID = require('../../../config.json').plaid[process.env.NODE_ENV].PLAID_CLIENT_ID;
const SECRET = require('../../../config.json').plaid[process.env.NODE_ENV].PLAID_SECRET;

const fetchBalances = async token => {
	const options = {
		headers: { 'content-type': 'application/json' },
		payload: {
			client_id: CLIENT_ID,
			secret: SECRET,
			access_token: token
		},
		json: 'true'
	};
	try {
		const { payload } = await Wreck.post(`${PLAID_URL}/accounts/balance/get`, options);
		return payload;
	} catch (error) {
		Boom.badRequest('Get account balance failed.', error);
	}
};

module.exports = {
	getAccountBalances: {
		type: new gql.GraphQLList(BalanceType),
		args: {
			access_token: { type: new gql.GraphQLNonNull(gql.GraphQLString) }
		},
		resolve: async (_, { access_token }) => {
			const balances = await fetchBalances(access_token);
			if (!balances) {
				return;
			}
			return balances.accounts.map(x => {
				return {
					account_id: x.account_id,
					balances: {
						available: x.balances.available,
						current: x.balances.current,
						limit: x.balances.limit
					},
					mask: x.mask,
					name: x.name,
					subtype: x.subtype
				};
			});
		}
	}
};
