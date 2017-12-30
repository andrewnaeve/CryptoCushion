const CoinbaseToken = require('./coinbaseToken');

const saveCoinbaseToken = (id, access_token, token_type, expires_in, refresh_token, scope) => {
	return new CoinbaseToken({ user_id: id }).fetch().then(result => {
		CoinbaseToken.save(
			{
				access_token: access_token,
				token_type: token_type,
				expires_in: expires_in,
				refresh_token: refresh_token,
				scope: scope
			},
			{ patch: true }
		);
	});
};

module.exports = {
	saveCoinbaseToken
};
