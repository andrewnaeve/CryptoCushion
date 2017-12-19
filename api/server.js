'use strict';

const Hapi = require('hapi');
const routes = require('./routes');
const server = new Hapi.Server();

const options = {
	ops: {
		interval: 1000
	},
	reporters: {
		myConsoleReporter: [
			{
				module: 'good-squeeze',
				name: 'Squeeze',
				args: [{ log: '*', response: '*' }]
			},
			{
				module: 'good-console'
			},
			'stdout'
		],
		myHTTPReporter: [
			{
				module: 'good-squeeze',
				name: 'Squeeze',
				args: [{ error: '*' }]
			},
			{
				module: 'good-http',
				args: [
					'http://prod.logs:3000',
					{
						wreck: {
							headers: { 'x-api-key': 12345 }
						}
					}
				]
			}
		]
	}
};

server.connection({
	port: 8000,
	host: 'localhost',
	routes: {
		cors: {
			origin: ['*']
		}
	}
});

routes.forEach(route => {
	server.route(require(route));
});

server.register(
	{
		register: require('good'),
		options
	},
	err => {
		if (err) {
			return console.error(err);
		}
		server.start(err => {
			if (err) {
				throw err;
			}
			console.log(`Server running on port: ${server.info.port}`);
		});
	}
);
