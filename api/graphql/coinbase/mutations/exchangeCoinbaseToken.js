const gql = require('graphql');
const Wreck = require('wreck');
const Boom = require('boom');
const Querystring = require('querystring');
const { userIdByEmail } = require('../../common/user/models/userMethods');
const { saveCoinbaseToken } = require('../models/coinbaseTokenMethods');
// const TokenType = require('../types/coinbaseTokenType');

const COINBASE_URL = require('../../../config.json').coinbase[process.env.NODE_ENV].COINBASE_URL;
const COINBASE_CLIENT_ID = require('../../../config.json').coinbase[process.env.NODE_ENV]
	.COINBASE_CLIENT_ID;
const COINBASE_CLIENT_SECRET = require('../../../config.json').coinbase[process.env.NODE_ENV]
	.COINBASE_CLIENT_SECRET;
const COINBASE_CALLBACK_URL = require('../../../config.json').coinbase[process.env.NODE_ENV]
	.COINBASE_CALLBACK_URL;

const exchangeToken = async code => {
	const queryString = `grant_type=authorization_code&code=${code}&client_id=${COINBASE_CLIENT_ID}&client_secret=${COINBASE_CLIENT_SECRET}&redirect_uri=${COINBASE_CALLBACK_URL}`;
	const options = {
		headers: {
			'content-type': 'application/x-www-form-urlencoded'
		},
		payload: queryString,
		json: true
	};
	try {
		const { res, payload } = await Wreck.post(`https://api.coinbase.com/oauth/token`, options);
		return payload;
	} catch (error) {
		console.log('ERRRROR', error);
	}
};

module.exports = {
	exchangeCoinbaseToken: {
		type: gql.GraphQLBoolean,
		args: {
			email: {
				type: new gql.GraphQLNonNull(gql.GraphQLString)
			},
			code: {
				type: new gql.GraphQLNonNull(gql.GraphQLString)
			}
		},
		resolve: async (_, { email, code }) => {
			const token = await exchangeToken(code);
			if (!token) {
				return Boom.notFound('Exchange token failed.');
			}
			const { access_token, token_type, expires_in, refresh_token, scope } = token;
			const id = await userIdByEmail(email);
			saveCoinbaseToken(id, access_token, token_type, expires_in, refresh_token, scope);
		}
	}
};
