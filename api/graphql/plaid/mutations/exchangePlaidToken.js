const gql = require('graphql');
const { userIdByEmail } = require('../../common/user/models/userMethods');
const { saveItem } = require('../models/itemMethods');
const Wreck = require('wreck');
const Boom = require('boom');
const PLAID_URL = require('../../../config.json').plaid[process.env.NODE_ENV].PLAID_URL;
const CLIENT_ID = require('../../../config.json').plaid[process.env.NODE_ENV].PLAID_CLIENT_ID;
const SECRET = require('../../../config.json').plaid[process.env.NODE_ENV].PLAID_SECRET;
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
	};
	const { payload } = await Wreck.post(`${PLAID_URL}/item/public_token/exchange}`, options);
	return payload;
};

module.exports = {
	exchangePlaidPublicToken: {
		type: gql.GraphQLBoolean,
		args: {
			email: {
				type: new gql.GraphQLNonNull(gql.GraphQLString)
			},
			public_token: {
				type: new gql.GraphQLNonNull(gql.GraphQLString)
			}
		},
		resolve: async (_, { email, public_token }) => {
			const token = await exchangePlaidToken(public_token);
			if (!token) {
				return Boom.notFound('Exchange token failed.');
			}
			const { access_token, item_id } = token;
			const id = await userIdByEmail(email);
			saveItem(id, access_token, item_id);
		}
	}
};
