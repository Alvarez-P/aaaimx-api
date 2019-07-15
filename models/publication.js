'use strict';
module.exports = (sequelize, DataTypes) => {
  const publication = sequelize.define('publication', {
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
  publication.associate = function(models) {
    // associations can be defined here
  };
  return publication;
};