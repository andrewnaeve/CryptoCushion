const bookshelf = require('../bookshelf');

const User = bookshelf.Model.extend({
	tableName: 'users',
	item: () => {
		this.hasOne('Item');
	}
});

module.exports = User;
