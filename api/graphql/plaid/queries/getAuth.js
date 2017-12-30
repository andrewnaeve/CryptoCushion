const gql = require('graphql');
const AuthType = require('../types/AuthType');
const Wreck = require('wreck');
const Boom = require('boom');
const PLAID_URL = require('../../../config.json').plaid[process.env.NODE_ENV].PLAID_URL;
const CLIENT_ID = require('../../../config.json').plaid[process.env.NODE_ENV].PLAID_CLIENT_ID;
const SECRET = require('../../../config.json').plaid[process.env.NODE_ENV].PLAID_SECRET;

const fetchAuth = async token => {
	const options = {
		headers: { 'content-type': 'application/json' },
		payload: {
			client_id: CLIENT_ID,
			secret: SECRET,
			access_token: token
		},
		json: 'true'
	};
	const { payload } = await Wreck.post(`${PLAID_URL}/auth/get`, options);
	return payload;
};

module.exports = {
	getAuth: {
		type: AuthType,
		args: {
			access_token: { type: new gql.GraphQLNonNull(gql.GraphQLString) }
		},
		resolve: async (_, { access_token }) => {
			const auth = await fetchAuth(access_token);
			if (!auth) {
				return Boom.notFound('Balance lookup failed.');
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
