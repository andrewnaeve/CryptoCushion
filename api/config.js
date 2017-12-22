var mysql = require('mysql');
require('dotenv').config();

const config = {
	$filter: 'env',
	$base: {
		dbConnection: {
			host: process.env.MYSQL_HOST,
			user: process.env.MYSQL_USER,
			password: process.env.MYSQL_PASSWORD,
			database: process.env.MYSQL_DATABASE,
			port: process.env.MYSQL_PORT
		}
	}
};
