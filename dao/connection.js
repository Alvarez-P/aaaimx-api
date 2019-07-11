'use strict'

const Sequelize = require('sequelize')
let sequelize = null
const config = require('./config')
const CollaboratorModel = require('../models/collaborator')
const ResearchModel = require('../models/research')
const UserModel = require('../models/user')
const user = require('./user')
module.exports = async function connection() {
    if (!sequelize) {
        sequelize = new Sequelize(config)
    }
    await sequelize.authenticate()

    const User = await UserModel(sequelize, Sequelize)
    const Research = await ResearchModel(sequelize, Sequelize)
    const Collaborator = await CollaboratorModel(sequelize, Sequelize)
    return {
        Research,
        Collaborator, 
        User
    }
}

