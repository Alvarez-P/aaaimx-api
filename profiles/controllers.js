const connection = require('../dao/connection')

// const { encodePassword } = require('../../utils/service')

async function createOrUpdate(profile) {
    const { Profile } = await connection()
    let cond
    let existingProfile

    if (profile.uuid) {
        cond = {
            where: {
                uuid: profile.uuid
            }
        }
    } else {
        cond = {
            where: {
                name: profile.name,
                lastname: profile.lastname
            }
        }
    }
    try {
        existingProfile = await Profile.findOne(cond)
    } catch (error) {
        console.log(error)
    }

    console.log(profile)

    if (existingProfile) {
        const updated = await Profile.update(profile, cond)
        return updated ? Profile.findOne(cond) : existingProfile
    }

    const result = await Profile.create(profile)
    return result.toJSON()
}

module.exports = {
    createOrUpdate
}