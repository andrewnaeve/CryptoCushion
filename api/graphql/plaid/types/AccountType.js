const { ObjectType, String, Float } = require('../../utilities/GraphQLTypeUtilities');

const AccountType = ObjectType({
	name: 'AccountType',
	fields: () => ({
		account_id: { type: String },
		balances: {
			type: ObjectType({
				name: 'Balance',
				fields: {
					available: {
						type: Float
					},
					current: { type: Float },
					limit: { type: Float }
				}
			})
		},
		mask: { type: String },
		name: { type: String },
		subtype: { type: String }
	})
});

module.exports = AccountType;
