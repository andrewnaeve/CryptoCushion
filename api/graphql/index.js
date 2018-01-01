const { Schema, ObjectType } = require('./utilities/GraphQLTypeUtilities');

const { plaidQueries, plaidMutations } = require('./plaid');
const { userQueries, userMutations } = require('./common/user');
const { coinbaseMutations } = require('./coinbase');

const schema = Schema({
	query: ObjectType({
		name: 'RootQueryType',
		fields: () => ({
			...userQueries,
			...plaidQueries
		})
	}),
	mutation: ObjectType({
		name: 'RootMutationType',
		fields: () => ({
			...userMutations,
			...plaidMutations,
			...coinbaseMutations
		})
	})
});

module.exports = schema;
