'use strict';
module.exports = (sequelize, Sequelize) => {
  const Partner = sequelize.define('Partner', {
    uuid: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4
    },
    sc_partner: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    },
    institute: Sequelize.STRING
  }, {});
  Partner.associate = function(models) {
    // associations can be defined here
  };
  return Partner;
};