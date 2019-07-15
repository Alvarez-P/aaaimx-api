'use strict';
module.exports = (sequelize, DataTypes) => {
  const interesed_areas = sequelize.define('interesed_areas', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    topic: {
      type: Sequelize.STRING
    },
    category: DataTypes.STRING
  }, {});
  interesed_areas.associate = function(models) {
    // associations can be defined here
  };
  return interesed_areas;
};