const connection = require('../dao/connection')

// const { encodePassword } = require('../../utils/service')

async function createOrUpdate(research) {
    const { Project, Research, Collaborator, InterestArea } = await connection()
    let cond, existingResearch = null

    if (research.uuid) {
        cond = {
            where: {
                uuid: research.uuid
            }
        }
    } else {
        cond = {
            where: {
                title: research.title,
                type: research.type,
            }
        }
    }
    existingResearch = await Research.findOne(cond)
    console.log(research)
    if (!existingResearch)
        existingResearch = await Research.create(research)

    await existingResearch.setAuthors([])
    research.extra.Authors.forEach(async (author) => {
        let new_author = await Collaborator.findOne({ where: { fullname: author } })
        if (!new_author) {
            new_author = await Collaborator.create({ fullname: author })
        }
        await existingResearch.addAuthor(new_author)
    });

    await existingResearch.setProjects([])
    research.Projects.forEach(async (project) => {
        let new_project = await Project.findOne({ where: { uuid: project } })
        await existingResearch.addProject(new_project)
    });

    await existingResearch.setAdvisors([])
    research.extra.Advisors.forEach(async (advisor) => {
        let new_advisor = await Collaborator.findOne({ where: { fullname: advisor } })
        if (!new_advisor) {
            new_advisor = await Collaborator.create({ fullname: advisor })
        }
        await existingResearch.addAdvisor(new_advisor)
    });

    await existingResearch.setInterestAreas([])
    research.Topics.forEach(async (topic) => {
        let line = await InterestArea.findOne({ where: { topic } })
        if (!line) {
            line = await InterestArea.create({ topic })
        }
        await existingResearch.addInterestArea(line)
    });
    return existingResearch.dataValues
}

async function getResearches(researches) {
    for (let index = 0; index < researches.length; index++) {
        let coll = researches[index]
        coll = await getResearch(coll)
    }
    return researches
}

async function getResearch(research) {
        let coll = research
        coll.dataValues.projects = await coll.getProjects();
        coll.dataValues.authors = await coll.getAuthors();
        coll.dataValues.advisors = await coll.getAdvisors();
        coll.dataValues.lines = await coll.getInterestAreas();
    
    return research
}
module.exports = {
    createOrUpdate,
    getResearches,
    getResearch
}
