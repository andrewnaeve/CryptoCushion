const gql = require('graphql');
const rootQuery = require('./rootQuery');
// const rootMutation = require('./rootMutation');

const schema = new gql.GraphQLSchema({
	rootQuery
});

module.exports = schema;
