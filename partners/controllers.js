const connection = require('../dao/connection')

async function createOrUpdate(partner) {
    const { Partner, Role } = await connection() // modelos involucrados en el proceso
    let cond, existingPartner, partner // inicializar banderas
    
    if (partner.institute) { // existe entonces debemos buscar por uuid
        cond = {
            where: {
                uuid: partner.institute
            }
        }
    } 

    existingPartner = await Partner.findOne({ where: partner.Adscription }) // la adscripcion debe venir el body como un objeto

    // si no existe lo creamos y lo asigno a mi variable de modelo Partner
    if (existingPartner)
        partner = existingPartner
    else
        partner = await Partner.create(partner.Adscription)
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