const bookshelf = require('../../../bookshelf');
const { User } = require('../../common/user/db/models');
// require('../../common/user/db/models');

const Item = bookshelf.Model.extend({
	tableName: 'items',
	user: () => {
		return this.belongsTo(User);
	}
});

module.exports = Item;
//  bookshelf.model('Item', Item);
