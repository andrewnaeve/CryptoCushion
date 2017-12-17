var dbConfig = require('./knexfile').development;
var knex = require('knex')(dbConfig);
module.exports = require('bookshelf')(knex);
