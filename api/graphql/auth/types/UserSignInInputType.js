const { InputObjectType, String, NonNull } = require('../../utilities/GraphQLTypeUtilities')

const UserSignInInputType = InputObjectType({
  name: 'UserSignInInputType',
  fields: () => ({
    email: { type: NonNull(String) },
    password: { type: NonNull(String) }
  })
})

module.exports = UserSignInInputType
