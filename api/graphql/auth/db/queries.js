const bcrypt = require('bcrypt');
const User = require('./models');

const hashPassword = plainText => {
	const saltRounds = 10;
	return bcrypt.hash(plainText, saltRounds);
};

const retrieveUserHashByEmail = email => {
	new User({ email: email })
		.fetch()
		.then(result => {
			return result.get('password');
		})
		.catch(e => e.code);
};

exports.saveUser = (first_name, last_name, email, password) => {
	return hashPassword(password).then(hash => {
		return User.forge({
			first_name: first_name,
			last_name: last_name,
			email: email,
			password: hash
		})
			.save()
			.then(result => {
				return {
					result: 'success',
					id: result.get('id'),
					email: result.get('email')
				};
			})
			.catch(e => {
				return {
					result: e.code
				};
			});
	});
};

exports.comparePassword = (email, plainText) => {
	return retrieveUserHashByEmail(email).then(storedHash => {
		return bcrypt.compare(plainText, storedHash);
	});
};
