'use strict';
require('dotenv').config();
const Glue = require('glue');
const manifest = require('./manifest');
const routes = require('./routes');

const options = {
	relativeTo: __dirname + '/src'
};

Glue.compose(manifest, options, function(err, server) {
	if (err) {
		throw err;
	}

	routes.forEach(route => {
		server.route(require(route));
	});

	server.start(function() {
		console.log(`Server running on port ${server.info.port}.`);
		console.log(`Environment: ${process.env.NODE_ENV}.`);
	});
});
