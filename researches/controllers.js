const connection = require('../dao/connection')

// const { encodePassword } = require('../../utils/service')

async function createOrUpdate(research) {
    const { Research } = await connection()
    let cond
    let existingResearch
    console.log(research)
    if (research.uuid) {
        cond = {
            where: {
                uuid: research.uuid
            }
        }
        try {
            existingResearch = await Research.findOne(cond)
        } catch (error) {
            console.log(error)
        }
    }

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
