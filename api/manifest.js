const Boom = require('boom')
const { graphiqlHapi } = require('apollo-server')
const { graphqlHapi } = require('apollo-server-hapi')
const schema = require('./graphql')

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
            {
              module: 'good-console'
            },
            'stdout'
          ]
        }
      }
    }
  },
  {
    plugin: {
      register: graphqlHapi,
      options: {
        path: '/graphql',
        graphqlOptions: {
          schema: schema
        }
      }
    }
  },
  {
    plugin: {
      register: graphiqlHapi,
      options: {
        path: '/graphiql',
        graphiqlOptions: {
          endpointURL: '/graphql'
        }
      }
    }
  }
]

module.exports = {
  server: {
    debug: {
      log: ['error'],
      request: ['error']
    },
    connections: {
      router: {
        stripTrailingSlash: true
      },
      routes: {
        validate: {
          options: {
            abortEarly: false
          },
          failAction: (request, reply, source, error) => {
            if (!error.data || !error.data.details) {
              if (error.isBoom) {
                return reply(error)
              } else {
                return reply(Boom.badImplementation(error))
              }
            }
            error.output.payload.validationErrors = error.data.details.map(failure => ({
              message: failure.message,
              type: failure.type,
              key: failure.path,
              data: failure.data
            }))
            reply(error)
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
}
