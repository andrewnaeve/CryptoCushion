const { getAccessCode } = require('./mutations/getAccessCode')
const { refreshAccessToken } = require('./mutations/refreshAccessToken')

exports.coinbaseMutations = { getAccessCode, refreshAccessToken }
