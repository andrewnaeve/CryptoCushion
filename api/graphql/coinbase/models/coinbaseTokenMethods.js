const CoinbaseToken = require('./coinbaseToken');

const saveCoinbaseToken = (id, access_token, token_type, expires_in, refresh_token, scope) => {
	return new CoinbaseToken().where({ user_id: id }).save({
		user_id: id,
		access_token: access_token,
		token_type: token_type,
		expires_in: expires_in,
		refresh_token: refresh_token,
		scope: scope
	});
};

module.exports = {
	saveCoinbaseToken
};
