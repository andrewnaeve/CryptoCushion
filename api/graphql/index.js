const gql = require('graphql');
const { query } = require('./rootQuery');
const { mutation } = require('./rootMutation');

const schema = new gql.GraphQLSchema({
	query,
	mutation
});

module.exports = schema;
