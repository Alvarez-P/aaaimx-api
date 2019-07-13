'use strict'

const Sequelize = require('sequelize')
let sequelize = null
const config = require('./config')
const CollaboratorModel = require('../models/collaborator')
const ResearchModel = require('../models/research')
const UserModel = require('../models/user')
const ProjectModel = require('../models/project')

module.exports = async function connection() {
    if (!sequelize) {
        sequelize = new Sequelize(config)
    }
    await sequelize.authenticate()

    const Project = await ProjectModel(sequelize, Sequelize)
    const User = await UserModel(sequelize, Sequelize)
    const Research = await ResearchModel(sequelize, Sequelize)
    const Collaborator = await CollaboratorModel(sequelize, Sequelize)
    return {
        Project,
        Research,
        Collaborator, 
        User
    }
}

