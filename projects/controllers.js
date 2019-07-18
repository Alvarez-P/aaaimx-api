const connection = require('../dao/connection')

async function createOrUpdate(project) {
    const { Project, Partner, Collaborator, InterestArea } = await connection()
    let cond, existingProject, existingPartner, partner, in_charge = null
    console.log(project)
    if (project.uuid) { 
        cond = {
            where: {
                uuid: project.uuid
            }
        }
    } else {
        cond = {
            where: {
                title: project.title
            }
        }
    }
    existingProject = await Project.findOne(cond)
    existingPartner = await Partner.findOne({ where: project.Adscription })
    in_charge = await Collaborator.findOne({ where: project.InCharge })
    if (existingPartner)
        partner = existingPartner
    else
        partner = await Partner.create(project.Adscription)


    if (existingProject)
        await Project.update(project, cond)
    else
        existingProject = await Project.create(project)

    await existingProject.setPartner(partner)
    await existingProject.setResponsible(in_charge)

    project.Topics.forEach(async (topic) => {
        let line = await InterestArea.findOne({ where: { topic } })
        if (!line) {
            line = await InterestArea.create({ topic })
        }
        await existingProject.addInterestArea(line)
    });
    return existingProject.dataValues
}

async function getProjects(projects) {
    for (let index = 0; index < projects.length; index++) {
        let coll = projects[index]
        console.log(coll)
        coll.dataValues.responsible= await coll.getResponsible();
    }
    return projects
}
module.exports = {
    createOrUpdate,
    getProjects
}
