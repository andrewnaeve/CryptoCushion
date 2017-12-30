const User = require('./user');

const userByEmail = email => {
	return new User({ email: email }).fetch().then(model => {
		const { attributes: { id, first_name, last_name } } = model;
		return {
			id: id,
			first_name: first_name,
			last_name: last_name
		};
	});
};

const userIdByEmail = email => {
	return new User({ email: email }).fetch({ columns: 'id' }).then(model => {
		return model.get('id');
	});
};

const getAllUsers = () => {
	return new User().fetchAll().then(data => {
		return data.map(x => {
			return {
				id: x.attributes.id,
				first_name: x.attributes.first_name,
				last_name: x.attributes.last_name,
				email: x.attributes.email
			};
		});
	});
};

const createUser = (first_name, last_name, email) => {
	return new User().save({
		first_name: first_name,
		last_name: last_name,
		email: email
	});
};

module.exports = {
	userByEmail,
	userIdByEmail,
	getAllUsers,
	createUser
};
