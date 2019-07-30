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

function orderAuthors(Authors, array) {
    array.forEach((fullname, i, arr) => {
        Authors.forEach(el => {
            if (el.dataValues.fullname == fullname) {
                arr[i] = el
            }
        });
    });
    return array
}


async function getResearch(research) {
    research.dataValues.projects = await research.getProjects();
    research.dataValues.authors = await research.getAuthors();
    research.dataValues.advisors = await research.getAdvisors();
    let lines = await research.getInterestAreas();
    research.dataValues.lines = lines.map(line => line.topic)
    let authors = research.dataValues.authors
    let advisors = research.dataValues.advisors
    let extra = JSON.parse(research.dataValues.extra)
    research.dataValues.authors = orderAuthors(authors, extra.Authors)
    research.dataValues.advisors = orderAuthors(advisors, extra.Advisors)
    return research
}
module.exports = {
    createOrUpdate,
    getResearches,
    getResearch
}
