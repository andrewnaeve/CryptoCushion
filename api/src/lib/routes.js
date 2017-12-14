const ioc = require('electrolyte');

exports.register = (server, options, next) => {
	// Register routes now that jwt auth strategy has been registered
	return Promise.all([ioc.create('plaid/plaid-routes')]).then(routeArrays => {
		server.route([
			{
				method: 'GET',
				path: '/health-check',
				handler: (req, reply) => reply('all good')
			}
		]);
		routeArrays.forEach(routes => {
			server.route(routes);
		});
		next();
	});
};

exports.register.attributes = {
	name: 'routes',
	version: '0.0.1'
};
