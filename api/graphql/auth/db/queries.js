const bcrypt = require('bcrypt');
const User = require('./models');

const hashPassword = plainText => {
	const saltRounds = 10;
	try {
		return bcrypt.hash(plainText, saltRounds);
	} catch (err) {
		throw new Error(err.message);
	}
};

const retrieveUserHashByEmail = async email => {
	try {
		const storedHash = await new User({ email: email }).fetch();
		return storedHash.get('password');
	} catch (err) {
		throw new Error(err.message);
	}
};

exports.saveUser = async (first_name, last_name, email, password) => {
	try {
		const hashedPassword = await hashPassword(password);
		return User.forge({
			first_name: first_name,
			last_name: last_name,
			email: email,
			password: hashedPassword
		})
			.save()
			.then(() => true);
	} catch (err) {
		throw new Error(err.message);
	}
};

exports.comparePassword = async (email, plainText) => {
	try {
		const storedHash = await retrieveUserHashByEmail(email);
		return bcrypt.compare(plainText, storedHash);
	} catch (err) {
		throw new Error(err.message);
	}
};
