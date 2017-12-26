const gql = require('graphql');
const plaidMutations = require('./plaid/plaidMutations');

module.exports = {
	...plaidMutations
};
