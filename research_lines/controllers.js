const connection = require('../dao/connection')
const classification = require('../researches/classification')
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

        let researches = await coll.getResearches();
        let researches1 = await classification(researches)
        coll.dataValues.r_theses = researches1[0]
        coll.dataValues.r_publications = researches1[1]
        coll.dataValues.r_presentation = researches1[2]  
    }
    return researchlines
}

module.exports = {
    createOrUpdate,
    getResearchLines
}