const connection = require('../dao/connection')

// const { encodePassword } = require('../../utils/service')

async function createOrUpdate(research) {
    const { Project, Research, Collaborator, InterestArea } = await connection()
    let cond, existingResearch, existingProject, project = null
    console.log(research)
    if (research.uuid) {
        cond = {
            where: {
                uuid: research.uuid
            }
        }
    } else {
        cond = {
            where: {
                title: research.title
            }
        }
    }
    existingResearch = await Research.findOne(cond)
    existingProject = await Project.findOne({ where: research.Project })
    if (existingProject)
        project = existingProject
    else
        project = await Project.create(project.Project)


    if (existingResearch)
        await Project.update(project, cond)
    else
        existingResearch = await Project.create(project)

    research.Authors.forEach(async (author) => {
        let new_author = await Collaborator.findOne({ where: { author } })
        if (!new_author) {
            new_author = await Collaborator.create({ author })
        }
        await existingResearch.addAuthor(new_author)
    });

    await existingResearch.setProject(project)

    if (research.type == 'Tesis') {

        research.Advisors.forEach(async (advisor) => {
            let new_advisor = await Collaborator.findOne({ where: { advisor } })
            if (!new_advisor) {
                new_advisor = await Collaborator.create({ advisor })
            }
            await existingResearch.addAdvisor(new_advisor)
        });
    }

    research.Topics.forEach(async (topic) => {
        let line = await InterestArea.findOne({ where: { topic } })
        if (!line) {
            line = await InterestArea.create({ topic })
        }
        await existingResearch.addInterestArea(line)
    });
    return existingResearch.dataValues
}

module.exports = {
    createOrUpdate
}
