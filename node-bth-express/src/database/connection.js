const knex = require('knex')
const configurations = require('../../knexfile')

const connection = knex(configurations[process.env.NODE_ENV])

module.exports = connection