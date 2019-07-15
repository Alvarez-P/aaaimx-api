const connection = require('../dao/connection')

// const { encodePassword } = require('../../utils/service')

async function createOrUpdate(interesedAreas) {
    const { InteresedAreas } = await connection()
    let cond
    let existingResearch
    console.log(interesedAreas)
    if (interesedAreas.uuid) {
        cond = {
            where: {
                uuid: interesedAreas.uuid
            }
        }
        try {
            existingResearch = await InteresedAreas.findOne(cond)
        } catch (error) {
            console.log(error)
        }
    }

    if (existingResearch) {
        const updated = await InteresedAreas.update(interesedAreas, cond)
        return updated ? InteresedAreas.findOne(cond) : existingResearch
    }

    const result = await InteresedAreas.create(interesedAreas)
    return result.toJSON()
}

module.exports = {
    createOrUpdate
}
