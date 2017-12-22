const Boom = require('boom');
const Wreck = require('wreck');

module.exports = [
	{
		method: 'POST',
		path: '/createUser',
		config: {
			handler: (request, reply) => {
				reply();
			}
		}
	}
];
