const connection = require('../dao/connection')
const bcrypt = require('bcrypt');
const saltRounds = 10;
const { sign, verify } = require('./auth')
const ERROR_404 = {
    error: "DataNotFound"
}
// const { encodePassword } = require('../../utils/service')

async function register(user) {
    const { User } = await connection()
    let cond, existingUser
    if (user.uuid) {
        cond = {
            where: {
                uuid: user.uuid
            }
        }
    } else {
        cond = {
            where: {
                email: user.email
            }
        }
    }
    existingUser = await User.findOne(cond)
    user.password = await encrypt(user.password)
    if (existingUser) {
        const updated = await User.update(user, cond)
        return updated ? User.findOne(cond) : existingUser
    }
    const result = await User.create(user)
    return result.toJSON()
}

async function login(user) {
    const { User } = await connection()
    const promise = new Promise((resolve, reject) => {
        User.findOne({
            where: { email: user.email },
        }).then( async (existingUser) => {
            const match = await bcrypt.compare(user.password, existingUser.password)
            if (match) {
                let perms
                if (existingUser.is_staff) {
                    perms = ["admin", "read", "create", "update"]
                }
                const payload = {
                    user: existingUser.dataValues,
                    "permissions": perms
                }
                console.log(payload)
                const token = await sign(payload, process.env.SECRET)
                resolve(token)
            } 
            else  reject({ error: 'Unauthorized', status: 401 })
        }, err => {
            reject({ error: 'InternalServerError', status: 500 })
        })
    })
    return promise
}

let encrypt = (password) => {
    const promise = new Promise((resolve, reject) => {
        bcrypt.hash(password, saltRounds).then(function (hash) {
            resolve(hash)
        }, err => {
            reject({
                error: 'CannotGenerateHash'
            })
        });
    });
    return promise
};
module.exports = {
    register,
    login
}