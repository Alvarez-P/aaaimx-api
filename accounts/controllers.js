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

    if (existingUser) {
        const updated = await User.update(user, cond)
        return updated ? User.findOne(cond) : existingUser
    }
    user.password = encrypt(user.password)
    if (email === null || password === null) {
        return res.status(500).send(ERROR_404);
    } else {
        const result = await User.create(user)
        return result.toJSON()
    }
}
async function login(user) {
    const { User } = await connection()

    const promise = new Promise((resolve, reject) => {
        User.findOne({
            where: {
                email: user.email
            }
        })
        if (checkPassword(password, user.password)) return User
    })
    return promise

}
let encrypt = (password) => {
    return new Promise(resolve => {
        bcrypt.hash(myPlaintextPassword, saltRounds).then(function (hash) {
        });
    });
};

let checkPassword = async (password, hash) => {
    return bcrypt.compare(password, hash);
}
module.exports = {
    register,
    login
}