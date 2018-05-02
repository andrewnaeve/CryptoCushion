const bookshelf = require('../../../bookshelf')
const { Item } = require('../../plaid/db/models')
const { CoinbaseToken } = require('../../coinbase/db/models')
// require('../../../plaid/models/item');
// require('../../../coinbase/models/coinbaseToken');

const User = bookshelf.Model.extend({
  tableName: 'users',
  item: () => {
    this.hasOne(Item)
  },
  coinbaseToken: () => {
    this.hasOne(CoinbaseToken)
  }
})

module.exports = User
// module.exports = bookshelf.model('User', User);
