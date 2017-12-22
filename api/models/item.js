const bookshelf = require('../bookshelf');

const Item = bookshelf.Model.extend({
	tableName: 'items',
	user: () => {
		return this.belongsTo('User');
	}
});

module.exports = Item;
