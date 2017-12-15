const Boom = require('boom');

module.exports = [
	{
		method: 'GET',
		path: '/yo',
		handler: function(request, h) {
			return 'you';
		}
	},
	{
		method: 'GET',
		path: '/hi',
		handler: function(request, h) {
			return 'fuck';
		}
	}
];
