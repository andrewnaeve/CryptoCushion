const CoinbaseToken = require('./coinbaseToken');
const Boom = require('boom');

const saveCoinbaseTokenByUserId = (id, access_token, token_type, expires_in, refresh_token, scope) => {
	return new CoinbaseToken()
		.where({ user_id: id })
		.save({
			user_id: id,
			access_token: access_token,
			token_type: token_type,
			expires_in: expires_in,
			refresh_token: refresh_token,
			scope: scope
		})
		.catch(error => {
			Boom.badData();
		});
};

const getRefreshTokenByUserId = user_id => {
	return new CoinbaseToken({ user_id: user_id })
		.fetch()
		.then(model => {
			const { attributes: { refresh_token } } = model;
			return refresh_token;
		})
		.catch(error => {
			Boom.notFound('refresh lookup failed', error);
		});
};

const saveRefreshToken = (id, access_token, token_type, expires_in, refresh_token, scope) => {
	return new CoinbaseToken()
		.where({ user_id: id })
		.save(
			{
				user_id: id,
				access_token: access_token,
				token_type: token_type,
				expires_in: expires_in,
				refresh_token: refresh_token,
				scope: scope
			},
			{ patch: true }
		)
		.catch(error => {
			Boom.badData();
		});
};

module.exports = {
	saveCoinbaseTokenByUserId,
	getRefreshTokenByUserId,
	saveRefreshToken
};
