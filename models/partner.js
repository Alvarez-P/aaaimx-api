'use strict';
module.exports = (sequelize, Sequelize) => {
  class Partner extends Sequelize.Model { }
  Partner.init({
    uuid: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4
    },
    institute: {
      allowNull: false,
      type: Sequelize.STRING
    },
    sc_partner: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    }
  }, { sequelize, modelName: 'Partner' });
  return Partner;
};