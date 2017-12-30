const bookshelf = require('../../../bookshelf');
// const User = require('../../common/user/models/user');
require('../../common/user/models/user');

const Item = bookshelf.Model.extend({
	tableName: 'items',
	user: () => {
		return this.belongsTo('User');
	}
});

module.exports = bookshelf.model('Item', Item);
