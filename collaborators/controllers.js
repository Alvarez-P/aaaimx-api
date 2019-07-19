const connection = require('../dao/connection')

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
        let roles = await coll.getRoles();
        coll.dataValues.roles = []
        roles.forEach((element) => {
            coll.dataValues.roles.push(element.name)
        });
        coll.dataValues.projects = await coll.getProjects();
        let researches = await coll.getResearches();
        let t = ["thesis", "tesis"], pu = ["publication", "publicacion", "publicación"], pre = ["presentation", "presentacion", "presentación"]
        let thesis = [], pub = [], presentation = []
        researches.forEach((element) => {
            if(t.includes(element.type.toLowerCase())) thesis.push(element)
            if(pu.includes(element.type.toLowerCase())) pub.push(element)
            if(pre.includes(element.type.toLowerCase())) presentation.push(element)
        });
        coll.dataValues.researches_thesis = thesis
        coll.dataValues.researches_publication = pub 
        coll.dataValues.researches_presentation = presentation 
        let adscription = await coll.getAdscription()
        coll.dataValues.adscription = adscription ? adscription.institute : null
    }
    return collaborators
}

module.exports = {
    createOrUpdate,
    getCollaborators
}