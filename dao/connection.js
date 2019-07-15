'use strict'

const Sequelize = require('sequelize')
let sequelize = null
const config = require('./config')
const CollaboratorModel = require('../models/collaborator')
const ResearchModel = require('../models/research')
const UserModel = require('../models/user')
const ProjectModel = require('../models/project')
const InteresedAreasModel = require('../models/interesed_areas')
const PartnerModel = require('../models/partner')
const PresentationModel = require('../models/presentation')
const PublicationModel = require('../models/publication')
const RoleModel = require('../models/role')
const ThesisModel = require('../models/thesis')

module.exports = async function connection() {
    if (!sequelize) {
        sequelize = new Sequelize(config)
    }
    await sequelize.authenticate()

    const Project = await ProjectModel(sequelize, Sequelize)
    const User = await UserModel(sequelize, Sequelize)
    const Research = await ResearchModel(sequelize, Sequelize)
    const Collaborator = await CollaboratorModel(sequelize, Sequelize)
    const InteresedAreas = await InteresedAreasModel(sequelize,Sequelize)
    const Partner = await PartnerModel(sequelize, Sequelize)
    const Presentation = await PresentationModel(sequelize, Sequelize)
    const Publication = await PublicationModel(sequelize, Sequelize)
    const Role = await RoleModel(sequelize, Sequelize)
    const Thesis = await ThesisModel(sequelize, Sequelize)

    return {
        Project,
        Research,
        Collaborator, 
        User,
        InteresedAreas,
        Partner,
        Presentation,
        Publication,
        Role,
        Thesis
    }
}

