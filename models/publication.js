'use strict';
module.exports = (sequelize, DataTypes) => {
  const Publication = sequelize.define('Publication', {
    uuid: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4
    },
    pub_in:{
      type: Sequelize.STRING
    },
    pub_type: DataTypes.STRING
  }, {});
  Publication.associate = function(models) {
    // associations can be defined here
  };
  return Publication;
};