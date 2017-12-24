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
		resolve(_, { access_token }) {
			return Promise.resolve(
				fetchBalances(access_token).then(data => {
					return data.accounts.map(x => {
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
				})
			);
		}
	}
};

const fetchBalances = token => {
	const options = {
		headers: { 'content-type': 'application/json' },
		payload: {
			client_id: process.env.PLAID_CLIENT_ID,
			secret: process.env.PLAID_SECRET,
			access_token: token
		},
		json: 'true'
	};

	return new Promise(resolve => {
		Wreck.post(
			`${plaidUrls}/accounts/balance/get`,
			options,
			(error, response, payload) => {
				if (error) {
					return Boom.badImplementation('Balance lookup failed.');
				}
				resolve(payload);
			}
		);
	});
};
