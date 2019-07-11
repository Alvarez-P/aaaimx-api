const connection = require('../dao/connection')

// const { encodePassword } = require('../../utils/service')

async function createOrUpdate(research) {
    const { Research } = await connection()
    let cond
    let existingResearch

    if (research.uuid) {
        cond = {
            where: {
                uuid: research.uuid
            }
        }
    }
    try {
        existingResearch = await Research.findOne(cond)
    } catch (error) {
        console.log(error)
    }

    console.log(research)

    if (existingResearch) {
        const updated = await Research.update(research, cond)
        return updated ? Research.findOne(cond) : existingResearch
    }

    const result = await Research.create(research)
    return result.toJSON()
}

module.exports = {
    createOrUpdate
}
