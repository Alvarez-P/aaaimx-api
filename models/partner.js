'use strict';
module.exports = (sequelize, Sequelize) => {
  class Partner extends Sequelize.Model { }
  Partner.init({
    institute: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.STRING
    },
    sc_partner: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    }
  }, { sequelize, modelName: 'Partner' });
  return Partner;
};