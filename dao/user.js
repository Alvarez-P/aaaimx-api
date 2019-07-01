'use strict'

module.exports = async function setupUser(UserModel) {
  async function createOrUpdate(user) {
    const cond = {
      where: {
        uuid: user.uuid
      }
    }

    const existingUser = await UserModel.findOne(cond)

    if (existingUser) {
      const updated = await UserModel.update(user, cond)
      return updated ? UserModel.findOne(cond) : existingUser
    }

    const result = await UserModel.create(user)
    return result.toJSON()
  }

  function findById(id) {
    return UserModel.findById(id)
  }

  function findByUuid(uuid) {
    return UserModel.findOne({
      where: {
        uuid
      }
    })
  }

  function findAll() {
    return UserModel.findAll()
  }

  function findByEmail(email) {
    return UserModel.findOne({
      where: {
        email
      }
    })
  }

  return {
    createOrUpdate,
    findById,
    findByUuid,
    findAll,
    findByEmail
  }
}

