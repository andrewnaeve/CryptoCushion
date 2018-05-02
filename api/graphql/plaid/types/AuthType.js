const { ObjectType, List } = require('../../utilities/GraphQLTypeUtilities')
const AccountType = require('./AccountType')
const NumbersType = require('./NumbersType')

const AuthType = ObjectType({
  name: 'AuthType',
  fields: () => ({
    accounts: { type: List(AccountType) },
    numbers: { type: List(NumbersType) }
  })
})

module.exports = AuthType
