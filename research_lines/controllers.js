const connection = require('../dao/connection')

// const { encodePassword } = require('../../utils/service')

async function createOrUpdate(line) {
    const { InteresedAreas } = await connection()
    let cond
    let existingResearchLine

    if (line.topic) {
        cond = {
            where: {
                topic: line.topic
            }
        }
    }
    existingResearchLine = await InteresedAreas.findOne(cond)

    if (existingResearch) {
        const updated = await InteresedAreas.update(line, cond)
        return updated ? InteresedAreas.findOne(cond) : existingResearchLine
    }

    const result = await InteresedAreas.create(line)
    return result.toJSON()
}

async function getResearchLines(researchlines) {
    for (let index = 0; index < researchlines.length; index++) {
        let coll = researchlines[index]
        console.log(coll)
        coll.dataValues.projects = await coll.getProjects();
        coll.dataValues.researchs = await coll.getResearches();
    }
    return researchlines
}

module.exports = {
    createOrUpdate,
    getResearchLines
}