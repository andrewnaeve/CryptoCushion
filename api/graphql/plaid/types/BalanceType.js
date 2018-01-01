const { String, ObjectType, Float } = require('../../utilities/GraphQLTypeUtilities');

const BalanceType = ObjectType({
	name: 'BalanceType',
	fields: () => ({
		account_id: { type: String },
		balances: {
			type: ObjectType({
				name: 'BalanceObject',
				fields: {
					available: { type: Float },
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

module.exports = BalanceType;
