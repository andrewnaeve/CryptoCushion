require('dotenv').config();
const config = require('./config.json').mysql[process.env.NODE_ENV];

module.exports = {
	development: {
		client: 'mysql',
		seeds: {
			directory: './seeds/dev'
		},
		connection: {
			host: config.MYSQL_HOST,
			user: config.MYSQL_USER,
			password: config.MYSQL_PASSWORD,
			database: config.MYSQL_DATABASE,
			port: config.MYSQL_PORT
		},
		pool: {
			min: 2,
			max: 10
		},
		migrations: {
			tableName: 'knex_migrations'
		}
	}
};
