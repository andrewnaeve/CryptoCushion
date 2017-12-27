const dbConfig = require('./knexfile').development;
const knex = require('knex')(dbConfig);
const bookshelf = require('bookshelf')(knex);

module.exports = bookshelf;
