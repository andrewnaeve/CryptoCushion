const { Schema, ObjectType } = require('./utilities/GraphQLTypeUtilities')
const { plaidQueries, plaidMutations } = require('./plaid')
const { userInfoQueries } = require('./common/userInfo')
const { coinbaseMutations } = require('./coinbase')
const { authMutations } = require('./auth')

const schema = Schema({
  query: ObjectType({
    name: 'RootQueryType',
    fields: () => ({
      ...userInfoQueries,
      ...plaidQueries
    })
  }),
  mutation: ObjectType({
    name: 'RootMutationType',
    fields: () => ({
      ...plaidMutations,
      ...coinbaseMutations,
      ...authMutations
    })
  })
})

module.exports = schema
