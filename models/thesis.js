'use strict';
module.exports = (sequelize, DataTypes) => {
  const thesis = sequelize.define('thesis', {
    uuid: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4
    },
    grade: {
      type: Sequelize.INTEGER
    },
    advisor: DataTypes.STRING
  }, {});
  thesis.associate = function(models) {
    // associations can be defined here
  };
  return thesis;
};