const Boom = require('boom');

module.exports = {
	method: 'GET',
	path: '/hi',
	config: {
		handler: (request, reply) => {
			reply('fuck');
			console.log('you');
		}
	}
};
