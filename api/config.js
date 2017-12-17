var mysql = require('mysql');
const plaid = require('plaid');

const plaidClient = new plaid.Client(
	process.env.PLAID_CLIENT_ID,
	process.env.PLAID_SECRET,
	process.env.PLAID_PUBLIC_KEY,
	process.env.PLAID_ENV
);

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
