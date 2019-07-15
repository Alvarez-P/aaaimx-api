'use strict';
module.exports = (sequelize, DataTypes) => {
  const Collaborator = sequelize.define('Collaborator', {
    uuid: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    extra: {
      type: DataTypes.JSON,
      allowNull: true
    }
  }, {});
  Collaborator.associate = function(models) {
    Collaborator.hasOne(models.Partner, {foreignKey: 'adscription', sourceKey: 'institute'});
  };
  return Collaborator;
};