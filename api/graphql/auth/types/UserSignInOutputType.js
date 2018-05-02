const { ObjectType, Boolean, ID } = require('../../utilities/GraphQLTypeUtilities')

const UserSignInOutputType = ObjectType({
  name: 'UserSignInOutputType',
  fields: () => ({
    result: { type: Boolean },
    id: { type: ID }
  })
})

module.exports = UserSignInOutputType
