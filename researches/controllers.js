const connection = require('../dao/connection')

// const { encodePassword } = require('../../utils/service')

async function createOrUpdate(research) {
    const { Research } = await connection()
    const cond = {
        where: {
            uuid: research.uuid
        }
    }

    const existingResearch = await Research.findOne(cond)

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
