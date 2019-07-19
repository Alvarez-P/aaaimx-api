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

    if (existingRole) {
        const updated = await Role.update(role, cond)
        return updated ? Role.findOne(cond) : existingRole
    }

    const result = await Role.create(role)
    return result.toJSON()
}

async function getRole(roles) {
    for (let index = 0; index < roles.length; index++) {
        let coll = roles[index]
        console.log(coll)
        coll.dataValues.collaborators = await coll.getCollaborators();
    }
    return roles
}

module.exports = {
    createOrUpdate,
    getRole
}