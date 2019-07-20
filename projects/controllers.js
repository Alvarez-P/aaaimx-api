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
        console.log(coll)
        let responsible = await coll.getResponsible()
        coll.dataValues.responsible = responsible ? responsible.fullname : null
        let institute = await coll.getInstitute()
        coll.dataValues.institute = institute ? institute.institute : null

        let researches = await coll.getResearches();
        let researches1 = await classification(researches)
        coll.dataValues.r_theses = researches1[0]
        coll.dataValues.r_publications = researches1[1]
        coll.dataValues.r_presentation = researches1[2] 
        
        let interestArea = await coll.getInterestAreas();
        let interestArea1 = []
        interestArea.forEach((element,index, array) => {
            interestArea1.push(element.topic)
          });
        coll.dataValues.interest_area = interestArea1
    }
    return projects
}
module.exports = {
    createOrUpdate,
    getProjects
}
