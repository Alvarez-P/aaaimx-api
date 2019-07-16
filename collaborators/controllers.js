const connection = require('../dao/connection')

async function createOrUpdate(collaborator) {
    const { Collaborator, Partner, Role } = await connection()
    let cond, existingCollaborator, existingPartner, partner = null
    console.log(collaborator)
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
    existingPartner = await Partner.findOne({ where: collaborator.Adscription })
    existingCollaborator = await Collaborator.findOne(cond)

    if (existingPartner)
        partner = existingPartner
    else
        partner = await Partner.create(collaborator.Adscription)

    if (existingCollaborator)
        await Collaborator.update(collaborator, cond)
    else
        existingCollaborator = await Collaborator.create(collaborator)

    existingCollaborator.setPartner(partner)
    collaborator.Roles.forEach(async (role) => {
        let new_role = await Role.findOne({ where: { name: role } })
        if (!new_role) {
            new_role = await Role.create({ name: role })
        }
        await existingCollaborator.addRole(new_role)
    });
    return existingCollaborator.dataValues
}

module.exports = {
    createOrUpdate
}