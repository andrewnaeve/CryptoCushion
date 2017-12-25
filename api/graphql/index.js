const gql = require('graphql');
const { query } = require('./rootQuery');
// const rootMutation = require('./rootMutation');

const schema = new gql.GraphQLSchema({
	query
});

module.exports = schema;
