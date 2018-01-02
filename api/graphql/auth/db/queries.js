const bcrypt = require('bcrypt');
const User = require('./models');

const hashPassword = plainText => {
	const saltRounds = 10;
	bcrypt
		.hash(plainText, saltRounds)
		.then(hash => {
			return hash;
		})
		.catch(err => err);
};

const retrieveUserHashByEmail = email => {
	return new User({ email: email })
		.fetch()
		.then(model => {
			return model.get('password');
		})
		.catch(err => err);
};

exports.saveUser = (first_name, last_name, email, password) => {
	Promise.resolve(hashPassword(password))
		.then(hashedPassword => {
			return new User().save({
				first_name: first_name,
				last_name: last_name,
				email: email,
				password: hashedPassword
			});
		})
		.catch(err => err);
};

exports.comparePassword = (email, plainText) => {
	Promise.resolve(retrieveUserHashByEmail(email))
		.then(hash => {
			return bcrypt.compare(plainText, hash);
		})
		.catch(err => err);
};
