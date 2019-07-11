const connection = require('../dao/connection')
const bcrypt = require('bcrypt');
const saltRounds = 10;
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
        existingUser = await User.findOne(cond)
    }
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
    const existingUser = await User.findOne({
        where: {
            email: user.email
        }
    })
    const match = await bcrypt.compare(user.password, existingUser.password);
    var promise = new Promise( async (resolve, reject) => {
        if (match)
            resolve(existingUser)
        else 
            reject({ error: 'Unauthorized'})
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