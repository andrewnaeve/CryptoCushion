const gql = require('graphql');
const AccountType = require('./AccountType');
const NumbersType = require('./NumbersType');

const AuthType = new gql.GraphQLObjectType({
	name: 'AuthType',
	fields: {
		accounts: { type: new gql.GraphQLList(AccountType) },
		numbers: { type: new gql.GraphQLList(NumbersType) }
	}
});

module.exports = AuthType;
