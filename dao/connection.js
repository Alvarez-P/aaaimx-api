'use strict'

const Sequelize = require('sequelize')
let sequelize = null
const config = require('./config')
const ProfileModel = require('../models/profile')
const ArticleModel = require('../models/article')
const UserModel = require('../models/user')
const user = require('./user')
module.exports = async function connection() {
    if (!sequelize) {
        sequelize = new Sequelize(config)
    }
    await sequelize.authenticate()

    const User = await UserModel(sequelize, Sequelize)
    const Article = await ArticleModel(sequelize, Sequelize)
    const Profile = await ProfileModel(sequelize, Sequelize)
    return {
        Article,
        Profile, 
        User
    }
}

