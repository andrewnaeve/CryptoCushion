const gql = require('graphql');
const BalanceType = require('../types/BalanceType');
const User = require('../../models/user');
const Item = require('../../models/item');
const Wreck = require('wreck');
const Boom = require('boom');
const plaidUrl = require('../utilities/plaidUrl')[process.env.NODE_ENV]['url'];

module.exports = {
	getAccountBalances: {
		type: new gql.GraphQLList(BalanceType),
		args: {
			access_token: { type: new gql.GraphQLNonNull(gql.GraphQLString) }
		},
		async resolve(_, { access_token }) {
			const balances = await fetchBalances(access_token);
			if (!balances) {
				throw new Error('Could not retrieve balances');
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

const fetchBalances = async token => {
	const options = {
		headers: { 'content-type': 'application/json' },
		payload: {
			client_id: process.env.PLAID_CLIENT_ID,
			secret: process.env.PLAID_SECRET,
			access_token: token
		},
		json: 'true'
	};
	try {
		const { payload } = await Wreck.post(
			`${plaidUrl}/accounts/balance/get`,
			options
		);
		return payload;
	} catch (error) {
		return Boom.badImplementation('Balance lookup failed.', error);
	}
};
