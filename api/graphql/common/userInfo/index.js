const { allUsers } = require('./queries/allUsers')
const { userByEmail } = require('./queries/userByEmail')

exports.userInfoQueries = {
  allUsers,
  userByEmail
}
