const connection = require('../dao/connection')

// const { encodePassword } = require('../../utils/service')

async function registerProfile(profile) {
    const { Profile } = await connection()
    const cond = {
        where: {
            uuid: profile.uuid
        }
    }

    const existingProfile = await Profile.findOne(cond)

    if (existingProfile) {
        const updated = await Profile.update(profile, cond)
        return updated ? Profile.findOne(cond) : existingProfile
    }

    const result = await Profile.create(profile)
    return result.toJSON()
}

module.exports = {
    registerProfile
}