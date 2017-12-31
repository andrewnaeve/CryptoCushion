const { getAccessCode } = require('./mutations/getAccessCode');
const { refreshAccessToken } = require('./mutations/refreshAccessToken');

module.exports = {
	getAccessCode,
	refreshAccessToken
};
