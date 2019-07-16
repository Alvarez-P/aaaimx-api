'use strict';
module.exports = (sequelize, Sequelize) => {
  const InteresedAreas = sequelize.define('InterestArea', {
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