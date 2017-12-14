/**
 * Module dependencies.
 */
var IoC = require('electrolyte');

/**
 * Draw routes.
 *
 * Route handlers are created using Electrolyte, which automatically wires
 * together any necessary components, including database connections, logging
 * facilities, configuration settings, etc.
 */
module.exports = function routes() {
	this.post('/', IoC.create('src/application/plaid/plaid-routes'));
};
