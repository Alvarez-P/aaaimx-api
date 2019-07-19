'use strict';
module.exports = (sequelize, Sequelize) => {
  class Collaborator extends Sequelize.Model { }
  Collaborator.init({
    uuid: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4
    },
    fullname: {
      type: Sequelize.STRING,
      allowNull: false
    },
    email: {
      type: Sequelize.STRING,
      allowNull: true
    },
    active: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    },
    extra: {
      type: Sequelize.JSON,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Collaborator'
  });
  return Collaborator;
};