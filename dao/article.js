'use strict'

module.exports = async function setupArticle(ArticleModel) {
  async function createOrUpdate(article) {
    const cond = {
      where: {
        uuid: article.uuid
      }
    }

    const existingArticle = await ArticleModel.findOne(cond)

    if (existingUser) {
      const updated = await ArticleModel.update(user, cond)
      return updated ? ArticleModel.findOne(cond) : existingArticle
    }

    const result = await ArticleModel.create(user)
    return result.toJSON()
  }

  function findById(id) {
    return ArticleModel.findById(id)
  }

  function findByUuid(uuid) {
    return ArticleModel.findOne({
      where: {
        uuid
      }
    })
  }

  function findAll() {
    return ArticleModel.findAll()
  }

 
  return {
    createOrUpdate,
    findById,
    findByUuid,
    findAll
  }
}