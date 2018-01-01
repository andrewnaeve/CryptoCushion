const Boom = require('boom');
const Wreck = require('wreck');
const { NonNull, Int, Boolean } = require('../../utilities/GraphQLTypeUtilities');
const { saveRefreshTokenByUserId, getRefreshTokenByUserId } = require('../db/queries');
// const TokenType = require('../types/coinbaseTokenType');

const COINBASE_URL = require('../../../config.json').coinbase[process.env.NODE_ENV].COINBASE_URL;
const COINBASE_CLIENT_ID = require('../../../config.json').coinbase[process.env.NODE_ENV].COINBASE_CLIENT_ID;
const COINBASE_CLIENT_SECRET = require('../../../config.json').coinbase[process.env.NODE_ENV]
	.COINBASE_CLIENT_SECRET;

const exchangeRefreshToken = async refreshToken => {
	const queryString = `grant_type=refresh_token&refresh_token=${refreshToken}&client_id=${COINBASE_CLIENT_ID}&client_secret=${COINBASE_CLIENT_SECRET}`;
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
	refreshAccessToken: {
		type: Boolean,
		args: {
			user_id: {
				type: NonNull(Int)
			}
		},
		resolve: async (_, { user_id }) => {
			const refreshToken = await getRefreshTokenByUserId(user_id);
			if (refreshToken.isBoom) {
				return Boom.badData('Refresh token failed.');
			}
			const newCoinbaseToken = await exchangeRefreshToken(refreshToken);
			if (!newCoinbaseToken) {
				return Boom.badData('Token empty');
			}
			const { access_token, token_type, expires_in, refresh_token, scope } = newCoinbaseToken;
			saveRefreshTokenByUserId(user_id, access_token, token_type, expires_in, refresh_token, scope);
		}
	}
};
