const connection = require('../dao/connection')

async function createOrUpdate(partner) {
    const { Partner } = await connection() // modelos involucrados en el proceso
    let cond, existingPartner // inicializar banderas
    

    if (partner.uuid) { // existe entonces debemos buscar por uuid
        cond = {
            where: {
                uuid: partner.uuid
            }
        }
    } else {
        cond = {
            where: {
                institute: partner.institute
            }
        }
    }
    existingPartner = await Partner.findOne(cond)

    if (existingPartner) {
        const updated = await Partner.update(partner, cond)
        return updated ? Partner.findOne(cond) : existingResearchLine
    }

    const result = await Partner.create(partner)
    return result.toJSON()

}
async function getPartners(partners) {
    for (let index = 0; index < partners.length; index++) {
        let coll = partners[index]
        console.log(coll)
        coll.dataValues.projects = await coll.getProjects();
    }
    return partners
}

module.exports = {
    createOrUpdate,
    getPartners
}