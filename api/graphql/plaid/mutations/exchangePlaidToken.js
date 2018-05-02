const { Boolean, String, NonNull } = require('../../utilities/GraphQLTypeUtilities')
const { userIdByEmail } = require('../../common/userInfo/db/queries')
const { saveItem } = require('../db/queries')
const Wreck = require('wreck')
const Boom = require('boom')
const { PLAID_URL } = require('../../../config.json').plaid[process.env.NODE_ENV]
const { CLIENT_ID } = require('../../../config.json').plaid[process.env.NODE_ENV]
const { SECRET } = require('../../../config.json').plaid[process.env.NODE_ENV]
// const PublicTokenInputType = require('../types/PublicTokenInputType');

const exchangePlaidToken = async token => {
  const options = {
    headers: {
      'content-type': 'application/json'
    },
    payload: {
      client_id: CLIENT_ID,
      secret: SECRET,
      public_token: token
    },
    json: 'true'
  }
  try {
    const { payload } = await Wreck.post(`${PLAID_URL}/item/public_token/exchange}`, options)
    return payload
  } catch (error) {
    Boom.badRequest('Request for Plaid access token rejected', error)
  }
}

module.exports = {
  exchangePlaidPublicToken: {
    type: Boolean,
    args: {
      email: {
        type: NonNull(String)
      },
      public_token: {
        type: NonNull(String)
      }
    },
    resolve: async (_, { email, public_token }) => {
      const token = await exchangePlaidToken(public_token)
      if (!token) {
        return
      }
      const { access_token, item_id } = token
      const id = await userIdByEmail(email)
      saveItem(id, access_token, item_id)
    }
  }
}
