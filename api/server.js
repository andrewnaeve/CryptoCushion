require('dotenv').config()
const Glue = require('glue')
const manifest = require('./manifest')
const path = require('path')
const options = {
  relativeTo: path(__dirname, '/src')
}

Glue.compose(manifest, options, function (err, server) {
  if (err) {
    throw err
  }
  server.start(function () {
    console.log(`Server running on port ${server.info.port}.`)
    console.log(`Environment: ${process.env.NODE_ENV}.`)
  })
})
