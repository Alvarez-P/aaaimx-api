'use strict';
module.exports = (sequelize, Sequelize) => {
  const Adscription = sequelize.define('Adscription', {
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
  Adscription.associate = function(models) {
    // associations can be defined here
  };
  return Adscription;
};