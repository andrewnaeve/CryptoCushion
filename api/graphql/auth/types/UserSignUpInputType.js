const { InputObjectType, String, NonNull } = require('../../utilities/GraphQLTypeUtilities');
const gql = require('graphql');

const UserSignUpInputType = InputObjectType({
	name: 'UserSignUpInputType',
	fields: () => ({
		first_name: { type: new gql.GraphQLNonNull(gql.GraphQLString) },
		last_name: { type: NonNull(String) },
		email: { type: NonNull(String) },
		password: { type: NonNull(String) }
	})
});

module.exports = UserSignUpInputType;
