const connection = require('../dao/connection')

// const { encodePassword } = require('../../utils/service')

async function createOrUpdate(role) {
    const { Role } = await connection()
    let cond
    let existingRole

    if (role.name) {
        cond = {
            where: {
                topic: role.name
            }
        }
    }
    existingRole = await Role.findOne(cond)

    if (existingResearch) {
        const updated = await Role.update(role, cond)
        return updated ? Role.findOne(cond) : existingRole
    }

    const result = await Role.create(role)
    return result.toJSON()
}

async function getRole(role) {
    for (let index = 0; index < role.length; index++) {
        let coll = role[index]
        console.log(coll)
        coll.dataValues.projects = await coll.getRoles();
    }
    return role
}

module.exports = {
    createOrUpdate,
    getRole
}