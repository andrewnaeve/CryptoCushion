const bookshelf = require('../../../../bookshelf');
const Item = require('../../../plaid/models/item');
const CoinbaseToken = require('../../../coinbase/models/coinbaseToken');
// require('../../../plaid/models/item');
// require('../../../coinbase/models/coinbaseToken');

const User = bookshelf.Model.extend({
	tableName: 'users',
	item: () => {
		this.hasOne('Item');
	},
	coinbaseToken: () => {
		this.hasOne('CoinbaseToken');
	}
});
module.exports = User;
// module.exports = bookshelf.model('User', User);
