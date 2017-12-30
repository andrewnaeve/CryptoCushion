const gql = require('graphql');
const TokenType = require('../types/coinbaseTokenType');
const Wreck = require('wreck');
const Boom = require('boom');
const { userIdByEmail } = require('../../common/user/models/userMethods');
const { saveCoinbaseToken } = require('../models/coinbaseTokenMethods');

const COINBASE_URL = require('../../../config.json').coinbase[process.env.NODE_ENV].COINBASE_URL;
const COINBASE_CLIENT_ID = require('../../../config.json').coinbase[process.env.NODE_ENV]
	.COINBASE_CLIENT_ID;
const COINBASE_CLIENT_SECRET = require('../../../config.json').coinbase[process.env.NODE_ENV]
	.COINBASE_CLIENT_SECRET;
const COINBASE_REDIRECT_URI = require('../../../config.json').coinbase[process.env.NODE_ENV]
	.COINBASE_REDIRECT_URI;

const exchangeToken = async code => {
	const options = {
		headers: {
			'content-type': 'application/json'
		},
		payload: {
			grant_type: 'authorization_code',
			code: code,
			client_id: COINBASE_CLIENT_ID,
			secret: COINBASE_CLIENT_SECRET,
			redirect_uri: COINBASE_REDIRECT_URI
		},
		json: 'true'
	};
	const { payload } = await Wreck.post(`${COINBASE_URL}/item/public_token/exchange}`, options);
	return payload;
};

module.exports = {
	exchangeToken: {
		type: TokenType,
		args: {
			email: {
				type: new gql.GraphQLInt()
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
			console.log('id', id);
			saveCoinbaseToken(id, access_token, token_type, expires_in, refresh_token, scope);
		}
	}
};
