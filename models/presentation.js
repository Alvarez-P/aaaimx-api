'use strict';
module.exports = (sequelize, Sequelize) => {
  const Presentation = sequelize.define('Presentation', {
    uuid: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4
    },
    event: { type: Sequelize.STRING }
  }, {});
  Presentation.associate = function(models) {
    // associations can be defined here
  };
  return Presentation;
};