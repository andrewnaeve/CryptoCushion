const gql = require('graphql');
const AuthType = require('../types/AuthType');
const User = require('../../models/user');
const Item = require('../../models/item');
const Wreck = require('wreck');
const Boom = require('boom');
const plaidUrl = require('../utilities/plaidUrl')[process.env.NODE_ENV]['url'];

module.exports = {
	getAuth: {
		type: AuthType,
		args: {
			access_token: { type: new gql.GraphQLNonNull(gql.GraphQLString) }
		},
		async resolve(_, { access_token }) {
			const auth = await fetchAuth(access_token);
			if (!auth) {
				return Boom.notFound('Balance lookup failed.', error);
			}
			const accountArray = auth.accounts.map(x => {
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
			const numbersArray = auth.numbers.map(y => {
				return {
					account: y.account,
					account_id: y.account_id,
					routing: y.routing,
					wire_routing: y.wire_routing
				};
			});
			return {
				accounts: accountArray,
				numbers: numbersArray
			};
		}
	}
};

const fetchAuth = async token => {
	const options = {
		headers: { 'content-type': 'application/json' },
		payload: {
			client_id: process.env.PLAID_CLIENT_ID,
			secret: process.env.PLAID_SECRET,
			access_token: token
		},
		json: 'true'
	};
	const { payload } = await Wreck.post(`${plaidUrl}/auth/get`, options);
	return payload;
};
