const Item = require('./item');

const saveItem = (id, access_token, item_id) => {
	return new Item().save(
		{
			user_id: id,
			access_token: access_token,
			item_id: item_id
		},
		{ patch: true }
	);
};

module.exports = {
	saveItem
};
