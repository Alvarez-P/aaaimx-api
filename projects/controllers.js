const connection = require('../dao/connection')
const classification = require('../researches/classification')
async function createOrUpdate(project) {
    const { Project, Partner, Collaborator, InterestArea } = await connection()
    let cond, existingProject, existingPartner, partner, in_charge
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

    if (!in_charge)
        in_charge = await Collaborator.create(project.InCharge)

    if (existingProject)
        await Project.update(project, cond)
    else
        existingProject = await Project.create(project)

    await existingProject.setInstitute(partner)
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
        coll = await getProject(coll)
    }
    return projects
}

async function getProject(project) {
    
        let coll = project
        console.log(coll)
        let responsible = await coll.getResponsible()
        coll.dataValues.responsible = responsible ? responsible.fullname : null
        let institute = await coll.getInstitute()
        coll.dataValues.institute = institute ? institute.institute : null
        let researches = await coll.getResearches();
        coll.dataValues = Object.assign({}, coll.dataValues, await classification(researches))
        let lines = await coll.getInterestAreas();
        let topics = []
        lines.forEach((element) => {
            topics.push(element.topic)
        });
        coll.dataValues.lines = topics
    return project
}

async function getCollaboratorsByProject(project) {
    let researches = await project.getResearches();
    researches.forEach(element => {
        console.log(element)
    });
}

module.exports = {
    getCollaboratorsByProject,
    createOrUpdate,
    getProjects,
    getProject
}
