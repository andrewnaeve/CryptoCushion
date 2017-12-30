const bookshelf = require('../../../bookshelf');
const User = require('../../common/models/user');

const Item = bookshelf.Model.extend({
	tableName: 'items',
	user: () => {
		return this.belongsTo(User);
	}
});

module.exports = Item;
