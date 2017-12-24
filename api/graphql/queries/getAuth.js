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
		resolve(_, { access_token }) {
			return Promise.resolve(
				fetchAuth(access_token).then(data => {
					const accountArray = data.accounts.map(x => {
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
					const numbersObject = data.numbers.map(y => {
						return {
							account: y.account,
							account_id: y.account_id,
							routing: y.routing,
							wire_routing: y.wire_routing
						};
					});
					console.log(numbersObject);
					return {
						accounts: accountArray,
						numbers: numbersObject
					};
					// return data.accounts.map(x => {

					// });
				})
			);
		}
	}
};

const fetchAuth = token => {
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
			`${plaidUrl}/auth/get`,
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
