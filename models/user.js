'use strict';

module.exports = (sequelize, Sequelize) => {
  var User = sequelize.define('User', {
  uuid: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4
    },
    email: {
      type: Sequelize.STRING,
      unique: true
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    },
  }, {
    classMethods: {
      associate: (models) => {
        // associations can be defined here
      }
    }
  });
  return User;
};