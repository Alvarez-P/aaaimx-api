'use strict'

module.exports = {
  PORT: process.env.PORT || 3000,
  SECRET_TOKEN: process.env.SECRET,
  WHITE_LIST: ['/accounts/login']
}
