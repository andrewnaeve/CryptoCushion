const { ObjectType, String, Float } = require('../../utilities/GraphQLTypeUtilities');

const NumbersType = ObjectType({
	name: 'NumbersType',
	fields: () => ({
		account: { type: Float },
		account_id: { type: String },
		routing: { type: Float },
		wire_routing: { type: Float }
	})
});

module.exports = NumbersType;
