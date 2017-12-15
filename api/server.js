'use strict';

const Hapi = require('hapi');
const server = new Hapi.Server();
const routes = require('./routes');

server.connection({
	port: 8000
});

routes.forEach(route => {
	server.route(require(route));
});

server.start(err => {
	if (err) throw err;
	console.log('server listening on port:', server.info.port);
});
