const connection = require('../dao/connection')

// const { encodePassword } = require('../../utils/service')

async function createOrUpdate(interesedAreas) {
    const { InteresedAreas } = await connection()
    let cond
    let existingResearchLine
    console.log(interesedAreas)
    if (interesedAreas.topic) {
        cond = {
            where: {
                uuid: interesedAreas.topic
            }
        }
        try {
            existingResearchLine = await InteresedAreas.findOne(cond)
        } catch (error) {
            console.log(error)
        }
    }

    if (existingResearch) {
        const updated = await InteresedAreas.update(interesedAreas, cond)
        return updated ? InteresedAreas.findOne(cond) : existingResearchLine
    }

    const result = await InteresedAreas.create(interesedAreas)
    return result.toJSON()
}

async function getInterestArea(interesedAreas) {
    for (let index = 0; index < interesedAreas.length; index++) {
        let coll = interesedAreas[index]
        console.log(coll)
        coll.dataValues.projects = await coll.getProjects();
        coll.dataValues.researchs = await coll.getResearches();
    }
    return interesedAreas
}

module.exports = {
    createOrUpdate,
    getInterestArea
}