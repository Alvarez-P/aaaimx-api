const connection = require('../dao/connection')
const classification = require('../researches/classification')
const { getResearches } = require('../researches/controllers')

async function createOrUpdate(collaborator) {
    const { Collaborator, Partner, Role } = await connection() // modelos involucrados en el proceso
    let cond, existingCollaborator, existingPartner, partner // inicializar banderas

    if (collaborator.uuid) { // existe entonces debemos buscar por uuid
        cond = {
            where: {
                uuid: collaborator.uuid
            }
        }
    } else { // es nuevo? checamos que no exista uno con mismo nombre y apellido
        cond = {
            where: {
                fullname: collaborator.fullname
            }
        }
    }
    existingPartner = await Partner.findOne({ where: collaborator.Adscription }) // la adscripcion debe venir el body como un objeto
    existingCollaborator = await Collaborator.findOne(cond) // buscamos al colaborador


    // si no existe lo creamos y lo asigno a mi variable de modelo Partner
    if (existingPartner)
        partner = existingPartner
    else
        partner = await Partner.create(collaborator.Adscription)

    // si no existe lo creamos y lo asigno a mi variable de modelo Collaborator
    if (existingCollaborator)
        await Collaborator.update(collaborator, cond)
    else
        existingCollaborator = await Collaborator.create(collaborator)

    // a cualquier de los dos le asignó su adscription
    // el metodo setPartner() me lo brinda sequelize con la asociación
    existingCollaborator.setAdscription(partner)

    // por ultimo le toca a los roles
    await existingCollaborator.setRoles([])
    collaborator.Roles.forEach(async (role) => { // por cada role igual hay que preguntar, buscar y/o crear
        let new_role = await Role.findOne({ where: { name: role } })
        if (!new_role) {
            new_role = await Role.create({ name: role })
        }
        await existingCollaborator.addRole(new_role) // de ultimo lo agrego a sus roles esto se va ala tabla CollaboratorRoles
    });
    return existingCollaborator.dataValues // retorno el modelo se sequel pero solo el objeto que contiene los valores
}

/**
 * Async function to return collaborators with roles
 * waiting for get roles due to getRoles() is asyncronous
 * @param {Array} collaborators 
 */
async function getCollaborators(collaborators) {
    for (let index = 0; index < collaborators.length; index++) {
        let coll = collaborators[index]
        coll = await getCollaborator(coll)
    }
    return collaborators
}

async function getCollaborator(collaborator) {
    let coll = collaborator
    let roles = await coll.getRoles();
    coll.dataValues.roles = roles.map(element => element.name);
    coll.dataValues.projects = await coll.getProjects();
    let researches = await coll.getResearches();
    let directed_theses = await coll.getTheses()
    researches.push.apply(researches, directed_theses)
    //researches = await getResearches(researches)
    coll.dataValues = Object.assign({}, coll.dataValues, await classification(researches))
    let adscription = await coll.getAdscription()
    coll.dataValues.adscription = adscription ? adscription.institute : null
    return collaborator
}

module.exports = {
    createOrUpdate,
    getCollaborators,
    getCollaborator
}