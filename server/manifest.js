const Boom = require('boom');

const registrations = [
	{
		plugin: {
			register: 'hapi-auth-jwt2'
		}
	},
	{
		plugin: {
			register: './lib/routes'
		}
	},
	{
		plugin: {
			register: 'good',
			options: {
				reporters: {
					consoleReporter: [
						{ module: 'good-squeeze', name: 'Squeeze', args: [{ log: '*', response: '*', error: '*', request: '*' }] },
						{ module: 'good-console' },
						'stdout'
					]
				}
			}
		}
	}
];

module.exports = {
	server: {
		debug: { log: ['error'], request: ['error'] },
		connections: {
			routes: {
				validate: {
					options: { abortEarly: false },
					failAction: (request, reply, source, error) => {
						if (!error.data || !error.data.details) {
							if (error.isBoom) {
								return reply(error);
							} else {
								return reply(Boom.badImplementation(error));
							}
						}
						error.output.payload.validationErrors = error.data.details.map(failure => ({
							message: failure.message,
							type: failure.type,
							key: failure.path,
							data: failure.data
						}));
						reply(error);
					}
				}
			}
		}
	},
	connections: [
		{
			port: 9000
		}
	],
	registrations
};
