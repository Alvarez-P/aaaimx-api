'use strict';
module.exports = (sequelize, DataTypes) => {
  const Profile = sequelize.define('Profile', {
    uuid: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      unique: true
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {});
  Profile.associate = function (models) {
    // associations can be defined here
  };
  return Profile;
};