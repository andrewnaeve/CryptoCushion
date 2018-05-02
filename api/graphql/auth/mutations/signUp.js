const UserSignUpInputType = require('../types/UserSignUpInputType')
const UserSignUpOutputType = require('../types/UserSignUpOutputType')
const { saveUser } = require('../db/queries')

module.exports = {
  signUp: {
    type: UserSignUpOutputType,
    args: {
      user: {
        type: UserSignUpInputType
      }
    },
    resolve: async (_, { user: { first_name, last_name, email, password } }) => {
      saveUser(first_name, last_name, email, password)
    }
  }
}
