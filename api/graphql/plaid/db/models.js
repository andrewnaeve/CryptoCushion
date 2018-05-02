const bookshelf = require('../../../bookshelf')
const { User } = require('../../common/userInfo/db/models')
// require('../../common/userInfo/db/models');

const Item = bookshelf.Model.extend({
  tableName: 'items',
  user: () => {
    return this.belongsTo(User)
  }
})

module.exports = Item
//  bookshelf.model('Item', Item);
