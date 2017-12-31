const gql = require('graphql');
const Wreck = require('wreck');
const Boom = require('boom');
const { userIdByEmail } = require('../../common/user/models/userMethods');
const { saveCoinbaseTokenByUserId } = require('../models/coinbaseTokenMethods');
// const TokenType = require('../types/coinbaseTokenType');

const COINBASE_URL = require('../../../config.json').coinbase[process.env.NODE_ENV].COINBASE_URL;
const COINBASE_CLIENT_ID = require('../../../config.json').coinbase[process.env.NODE_ENV].COINBASE_CLIENT_ID;
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
		const { payload } = await Wreck.post(`${COINBASE_URL}/oauth/token`, options);
		return payload;
	} catch (error) {
		return Boom.badRequest('Request for access token rejected', error.data.payload);
	}
};

module.exports = {
	getAccessCode: {
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
			if (token instanceof Boom) {
				return Boom.badData('Exchange token failed.');
			}
			const { access_token, token_type, expires_in, refresh_token, scope } = token;
			const id = await userIdByEmail(email);
			saveCoinbaseTokenByUserId(id, access_token, token_type, expires_in, refresh_token, scope);
		}
	}
};
