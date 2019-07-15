'use strict';
module.exports = (sequelize, DataTypes) => {
  const presentation = sequelize.define('presentation', {
    uuid: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4
    },
    event: DataTypes.STRING
  }, {});
  presentation.associate = function(models) {
    // associations can be defined here
  };
  return presentation;
};