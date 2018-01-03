const { signUp } = require('./mutations/signUp');
const { signIn } = require('./queries/signIn');

exports.authMutations = { signUp };
exports.authQueries = { signIn };
