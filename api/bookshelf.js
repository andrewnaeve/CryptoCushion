const dbConfig = require('./knexfile').development
const knex = require('knex')(dbConfig)
const bookshelf = require('bookshelf')(knex)
bookshelf.plugin('registry')
module.exports = bookshelf
