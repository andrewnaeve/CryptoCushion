const gql = require('graphql');
const queries = require('./rootQueries');
const mutations = require('./rootMutations');

const schema = new gql.GraphQLSchema({
	query: new gql.GraphQLObjectType({
		name: 'RootQueryType',
		fields: () => ({
			...queries
		})
	}),
	mutation: new gql.GraphQLObjectType({
		name: 'RootMutationType',
		fields: () => ({
			...mutations
		})
	})
});

module.exports = schema;
