'use strict';
module.exports = (sequelize, Sequelize) => {
  const Role = sequelize.define('Role', {
    name: {
      type: Sequelize.STRING
    }
  }, {});
  Role.associate = function(models) {
    // associations can be defined here
  };
  return Role;
};