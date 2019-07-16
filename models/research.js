'use strict';
module.exports = (sequelize, Sequelize) => {
  const Research = sequelize.define('Research', {
    uuid: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false
    },
    description: {
      type: Sequelize.STRING,
      allowNull: true
    },
    type: {
      type: Sequelize.STRING,
      allowNull: false
    },
    year: {
      type: Sequelize.STRING
    },
    pub_in:{
      type: Sequelize.STRING,
      allowNull: true
    },
    pub_type: {
      type: Sequelize.STRING,
      allowNull: true
    },
    event: {
      type: Sequelize.STRING,
      allowNull: true
    },
    grade: {
      type: Sequelize.STRING,
      allowNull: true
    },
    extra: {
      type: Sequelize.JSON,
      allowNull: true
    }
  }, {});
  Research.associate = function (models) {
    // associations can be defined here
  };
  return Research;
};