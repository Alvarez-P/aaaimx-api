const connection = require('../dao/connection')

// const { encodePassword } = require('../../utils/service')

async function registerArticle(article) {
    const { Article } = await connection()
    const cond = {
        where: {
            uuid: article.uuid
        }
    }

    const existingArticle = await Article.findOne(cond)

    if (existingArticle) {
        const updated = await Article.update(article, cond)
        return updated ? Article.findOne(cond) : existingArticle
    }

    const result = await Article.create(article)
    return result.toJSON()
}

module.exports = {
    registerArticle
}
