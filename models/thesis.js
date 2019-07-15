'use strict';
module.exports = (sequelize, Sequelize) => {
  const Thesis = sequelize.define('Thesis', {
    uuid: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4
    },
    grade: {
      type: Sequelize.STRING
    }
  }, {});
  Thesis.associate = function(models) {
    // associations can be defined here
  };
  return Thesis;
};