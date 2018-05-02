const { ObjectType, List, String, Float, Boolean } = require('../../utilities/GraphQLTypeUtilities')

const TransactionType = ObjectType({
  name: 'TransactionType',
  fields: () => ({
    account_id: { type: String },
    amount: { type: Float },
    category: { type: List(String) },
    date: { type: String },
    name: { type: String },
    pending: { type: Boolean },
    transaction_id: { type: String },
    transaction_type: { type: String }
  })
})

module.exports = TransactionType
