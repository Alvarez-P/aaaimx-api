const connection = require('../dao/connection')

// const { encodePassword } = require('../../utils/service')

async function createOrUpdate(collaborator) {
    const { Collaborator } = await connection()
    let cond
    let existingCollaborator

    if (collaborator.uuid) {
        cond = {
            where: {
                uuid: collaborator.uuid
            }
        }
    } else {
        cond = {
            where: {
                name: collaborator.name,
                lastname: collaborator.lastname
            }
        }
    }
    try {
        existingCollaborator = await Collaborator.findOne(cond)
    } catch (error) {
        console.log(error)
    }

    console.log(collaborator)

    if (existingCollaborator) {
        const updated = await Collaborator.update(collaborator, cond)
        return updated ? Collaborator.findOne(cond) : existingCollaborator
    }

    const result = await Collaborator.create(collaborator)
    return result.toJSON()
}

module.exports = {
    createOrUpdate
}