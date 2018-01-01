const { ObjectType, ID, Int } = require('../../utilities/GraphQLTypeUtilities');

const ItemType = ObjectType({
	name: 'ItemType',
	fields: () => ({
		id: { type: ID },
		user_id: { type: Int },
		access_token: { type: String },
		item_id: { type: String }
	})
});

module.exports = ItemType;
