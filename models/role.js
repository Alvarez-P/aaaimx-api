'use strict';
module.exports = (sequelize, Sequelize) => {
  const Role = sequelize.define('Role', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    tag: Sequelize.STRING
  }, {});
  Role.associate = function(models) {
    // associations can be defined here
  };
  return Role;
};