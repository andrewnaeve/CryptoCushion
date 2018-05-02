const { Item } = require('./models')

exports.saveItem = (id, access_token, item_id) => {
  return new Item({ user_id: id }).fetch().then(result => {
    if (result === null) {
      Item.save({
        user_id: id,
        access_token: access_token,
        item_id: item_id
      })
    } else {
      Item.where({ user_id: id }).save(
        {
          access_token: access_token,
          item_id: item_id
        },
        { patch: true }
      )
    }
  })
}
