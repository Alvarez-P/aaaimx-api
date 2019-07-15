'use strict';
module.exports = (sequelize, Sequelize) => {
  const Project = sequelize.define('Project', {
    uuid: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4
    },
    title: {
      type: Sequelize.STRING
    },
    institute: {
      type: Sequelize.STRING
    },
    start: {
      type: Sequelize.DATE
    },
    end: {
      type: Sequelize.DATE
    },
    extra: {
      type: Sequelize.JSON,
      allowNull: true
    },
  }, {});
  Project.associate = function (models) {
    // associations can be defined here
  };
  return Project;
};