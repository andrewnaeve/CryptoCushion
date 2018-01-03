const { CoinbaseToken } = require('./models');
const Boom = require('boom');

exports.saveCoinbaseTokenByUserId = (id, access_token, token_type, expires_in, refresh_token, scope) => {
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
			return Boom.badData();
		});
};

exports.getRefreshTokenByUserId = user_id => {
	return new CoinbaseToken({ user_id: user_id })
		.fetch()
		.then(model => {
			const { attributes: { refresh_token } } = model;
			return refresh_token;
		})
		.catch(error => {
			return Boom.notFound('refresh lookup failed', error);
		});
};

exports.saveRefreshTokenByUserId = (id, access_token, token_type, expires_in, refresh_token, scope) => {
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
			return Boom.badData();
		});
};
