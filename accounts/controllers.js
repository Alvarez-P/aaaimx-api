const connection = require('../dao/connection')

// const { encodePassword } = require('../../utils/service')

async function register(user) {
    const { User } = await connection()
    /** user = Object.assign({}, user, {
        password: await encodePassword(user.password)
    }) */
    return User.createOrUpdate(user)
}

async function login(user) {
    const { User } = await connection()
    return User.findByEmail(user.email)
}

module.exports = {
    register,
    login
}