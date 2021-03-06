const { NonNull, String } = require('../../../utilities/GraphQLTypeUtilities')
const Boom = require('boom')
const UserInfoType = require('../types/UserInfoType')
const { userByEmail } = require('../db/queries')

module.exports = {
  userByEmail: {
    type: UserInfoType,
    args: {
      email: { type: NonNull(String) }
    },
    resolve: async (_, { email }) => {
      const userInfo = await userByEmail(email)
      if (!userInfo) {
        return Boom.notFound('User not found')
      }
      return userInfo
    }
  }
}
