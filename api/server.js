const Glue = require('glue');
const manifest = require('./manifest');
require('dotenv').config();

const options = {
	relativeTo: __dirname + '/src'
};

Glue.compose(manifest, options, function(err, server) {
	if (err) {
		throw err;
	}
	server.start(function() {
		console.log('Server running at:', server.info.port);
		// console.log('Environment:', process.env.NODE_ENV);
	});
});
