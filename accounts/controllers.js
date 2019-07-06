const connection = require('../dao/connection')

// const { encodePassword } = require('../../utils/service')

async function register(user) {
    const { User } = await connection()
    const cond = {
        where: {
            uuid: user.uuid
        }
    }

    const existingUser = await User.findOne(cond)

    if (existingUser) {
        const updated = await User.update(user, cond)
        return updated ? User.findOne(cond) : existingUser
    }

    const result = await User.create(user)
    return result.toJSON()
}

async function login(user) {
    const { User } = await connection()
    return User.findOne({
        where: {
            email: user.email
        }
    })
}

module.exports = {
    register
}