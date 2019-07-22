'use strict'

module.exports = {
  PORT: process.env.PORT || 3001,
  SECRET_TOKEN: process.env.SECRET,
  WHITE_LIST: ['/accounts/login']
}
