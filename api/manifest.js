const Boom = require('boom');
const package = require('./package');
const { apolloHapi, graphiqlHapi } = require('apollo-server');
const graphqlSchema = require('./graphql/schema');
const createResolvers = require('./graphql/resolvers');
const { makeExecutableSchema } = require('graphql-tools');
const User = require('./models/user');

const executableSchema = makeExecutableSchema({
	typeDefs: [graphqlSchema],
	resolvers: createResolvers({ User })
});

const registrations = [
	{
		plugin: {
			register: 'good',
			options: {
				reporters: {
					consoleReporter: [
						{
							module: 'good-squeeze',
							name: 'Squeeze',
							args: [
								{
									log: '*',
									response: '*',
									error: '*',
									request: '*'
								}
							]
						},
						{ module: 'good-console' },
						'stdout'
					]
				}
			}
		}
	},
	{
		plugin: {
			register: apolloHapi,
			options: {
				path: '/graphql',
				apolloOptions: () => ({
					pretty: true,
					schema: executableSchema
				})
			}
		}
	}
];

module.exports = {
	server: {
		debug: { log: ['error'], request: ['error'] },
		connections: {
			router: {
				stripTrailingSlash: true
			},
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
						error.output.payload.validationErrors = error.data.details.map(
							failure => ({
								message: failure.message,
								type: failure.type,
								key: failure.path,
								data: failure.data
							})
						);
						reply(error);
					}
				}
			}
		}
	},
	connections: [
		{
			port: 8000,
			routes: {
				cors: {
					origin: ['*']
				},
				validate: {
					options: {
						stripUnknown: true
					}
				},
				payload: {
					allow: ['application/json']
				}
			}
		}
	],
	registrations
};
