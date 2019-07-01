'use strict'

const Sequelize = require('sequelize')
let sequelize = null
const config = require('./config')
const ProfileModel = require('../models/profile')
const ArticleModel = require('../models/article')

module.exports = async function connection() {
    if (!sequelize) {
        sequelize = new Sequelize(config)
    }
    await sequelize.authenticate()
    const Profile = await ProfileModel(sequelize, Sequelize)
    const Article = await ArticleModel(sequelize, Sequelize)
    return {
        Article,
        Profile
    }
}

