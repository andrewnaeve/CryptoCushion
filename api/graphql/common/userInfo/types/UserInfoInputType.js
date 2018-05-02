const { InputObjectType, String, ID } = require('../../../utilities/GraphQLTypeUtilities')

const UserInfoInputType = InputObjectType({
  name: 'UserInfoInputType',
  fields: () => ({
    id: { type: ID },
    first_name: { type: String },
    last_name: { type: String },
    email: { type: String }
  })
})

module.exports = UserInfoInputType
