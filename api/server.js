require('dotenv').config();
const Glue = require('glue');
const manifest = require('./manifest');
const options = {
	relativeTo: __dirname + '/src'
};

Glue.compose(manifest, options, function(err, server) {
	if (err) {
		throw err;
	}
	server.route({
		method: 'GET',
		path: '/auth',
		handler: function(request, reply) {
			reply('Hello!');
		}
	});
	server.start(function() {
		console.log(`Server running on port ${server.info.port}.`);
		console.log(`Environment: ${process.env.NODE_ENV}.`);
	});
});
