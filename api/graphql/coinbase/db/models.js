const bookshelf = require('../../../bookshelf');
const User = require('../../common/userInfo/db/models');

const CoinbaseToken = bookshelf.Model.extend({
	tableName: 'coinbase_tokens',
	user: () => {
		return this.belongsTo(User);
	}
});

module.exports = {
	CoinbaseToken
};
