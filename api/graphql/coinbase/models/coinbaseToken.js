const bookshelf = require('../../../bookshelf');
const User = require('../../common/models/user');

const CoinbaseToken = bookshelf.Model.extend({
	tableName: 'coinbase_tokens',
	user: () => {
		return this.belongsTo(User);
	}
});

module.exports = CoinbaseToken;
