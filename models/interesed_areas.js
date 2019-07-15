'use strict';
module.exports = (sequelize, Sequelize) => {
  const InteresedAreas = sequelize.define('InterestArea', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    topic: {
      type: Sequelize.STRING
    },
    category: {
      type: Sequelize.STRING,
      allowNull: true
    }
  }, {});
  InteresedAreas.associate = function(models) {
    // associations can be defined here
  };
  return InteresedAreas;
};