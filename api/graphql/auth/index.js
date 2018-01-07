const { signUp } = require('./mutations/signUp');
const { signIn } = require('./mutations/signIn');

exports.authMutations = { signIn, signUp };
