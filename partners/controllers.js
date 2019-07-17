const connection = require('../dao/connection')

async function createOrUpdate(partner) {
    const { Partner } = await connection() // modelos involucrados en el proceso
    let cond, existingPartner // inicializar banderas
    
    if (partner.institute) { // existe entonces debemos buscar por uuid
        cond = {
            where: {
                institute: partner.institute
            }
        }
    } 

    existingPartner = await Partner.findOne(cond) 

    if (existingPartner)
        partner = await Partner.update(partner, cond) 
    else
        partner = await Partner.create(partner)
    return partner
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