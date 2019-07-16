'use strict'

const Sequelize = require('sequelize')
let sequelize = null
const config = require('./config')
const CollaboratorModel = require('../models/collaborator')
const ResearchModel = require('../models/research')
const UserModel = require('../models/user')
const ProjectModel = require('../models/project')
const InterestAreaModel = require('../models/interesed_area')
const PartnerModel = require('../models/partner')
const RoleModel = require('../models/role')

module.exports = async function connection(setup) {
    if (!sequelize) {
        sequelize = new Sequelize(config)
    }
    await sequelize.authenticate()
    let Partner = await PartnerModel(sequelize, Sequelize)
    let Collaborator = await CollaboratorModel(sequelize, Sequelize)
    let Project = await ProjectModel(sequelize, Sequelize)
    let User = await UserModel(sequelize, Sequelize)
    let Research = await ResearchModel(sequelize, Sequelize)
    let InterestArea = await InterestAreaModel(sequelize, Sequelize)
    let Role = await RoleModel(sequelize, Sequelize)

    /** Association Collaborator-Project 1:M **/
    Collaborator.hasMany(Project, { as: 'Projects', constraints: true, foreignKey: 'in_charge' });
    Project.belongsTo(Collaborator, { as: 'Responsible', constraints: true, foreignKey: 'in_charge' });

    /** Association Partner-Collaborator 1:M **/
    Partner.hasMany(Collaborator, { as: 'Colls', constraints: true, foreignKey: 'adscription', sourceKey: 'institute' });
    Collaborator.belongsTo(Partner, { constraints: true, foreignKey: 'adscription', sourceKey: 'institute' });

    /** Association Partner-Project 1:M **/
    Partner.hasMany(Project, { as: 'Projects', constraints: true, foreignKey: 'institute', sourceKey: 'institute' });
    Project.belongsTo(Partner, { constraints: true, foreignKey: 'institute', sourceKey: 'institute' });

    /** Association Project-Research M:M **/
    Project.belongsToMany(Research, { as: 'Researches', through: 'ProjectResearch' });
    Research.belongsToMany(Project, { through: 'ProjectResearch' });

    /** Association Collaborator-Role M:M **/
    Role.belongsToMany(Collaborator, { as: 'Roles', through: 'CollaboratorRoles' });
    Collaborator.belongsToMany(Role, { through: 'CollaboratorRoles' });

    /** Association Reseach-Authors M:M **/
    Research.belongsToMany(Collaborator, { as: 'Authors', through: 'ResearchAuthors' });
    Collaborator.belongsToMany(Research, { as: 'Researches', through: 'ResearchAuthors' });

    /** Association Project-InterestArea M:M **/
    Project.belongsToMany(InterestArea, { as: 'InterestAreas', through: 'ProjectLines' });
    InterestArea.belongsToMany(Project, { as: 'Projects', through: 'ProjectLines' });

    /** Association Research-InterestArea M:M **/
    Research.belongsToMany(InterestArea, { as: 'InterestAreas', through: 'ResearchLines' });
    InterestArea.belongsToMany(Research, { as: 'Researches', through: 'ResearchLines' });

    if (setup) {
        await sequelize.sync({ force: setup });
    }

    return {
        Partner,
        Collaborator,
        Research,
        Collaborator,
        Project,
        User,
        InterestArea,
        Role
    }
}

