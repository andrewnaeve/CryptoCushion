const ioc = require('electrolyte');

exports.register = (server, options, next) => {
	ioc.use(ioc.dir('src'));
	ioc.use(ioc.dir('src/application/plaid'));
	ioc.use(ioc.dir('plaid/plaid-routes'));
	ioc.use(ioc.node_modules());
	// ioc.use(ioc.dir('src/lib'));
	ioc.use(function(id) {
		if (id === 'server') {
			server['@literal'] = true;
			return server;
		}
	});
	server.route(ioc.create('/plaid-routes'));
	next();
};

exports.register.attributes = {
	name: 'template-bootstrap',
	version: '0.0.1'
};
