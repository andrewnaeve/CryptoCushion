'use strict';

const Hapi = require('hapi');
const routes = require('./routes');

const server = Hapi.server({
	host: 'localhost',
	port: 8000
});

routes.forEach(route => {
	server.route(require(route));
});

async function start() {
	try {
		await server.start();
	} catch (err) {
		console.log(err);
		process.exit(1);
	}
	console.log('Server running on port:', server.info.port);
}

start();
