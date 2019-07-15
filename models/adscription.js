'use strict';
module.exports = (sequelize, DataTypes) => {
  const adscription = sequelize.define('adscription', {
    uuid: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4
    },
    sc_partner: {
      type: Sequelize.STRING
    },
    department: {
      type: Sequelize.STRING,
      allowNull: true
    },
    institute: DataTypes.STRING
  }, {});
  adscription.associate = function(models) {
    // associations can be defined here
  };
  return adscription;
};