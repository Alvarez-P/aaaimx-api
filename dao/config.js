'use strict'

module.exports = {
  database: process.env.DB_NAME,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST,
  dialect: 'mysql',
  pool: {
    max: 10,
    min: 0,
    idle: 10000
  },
  logging: console.log,
  logging: (str) => {
    console.log('[database]', str)
  }
}
