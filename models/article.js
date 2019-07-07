'use strict';
module.exports = (sequelize, Sequelize) => {
  const Article = sequelize.define('Article', {
    uuid: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false
    },
    description: {
      type: Sequelize.STRING,
      allowNull: true
    },
    type: {
      type: Sequelize.STRING,
      allowNull: false
    },
    year: {
      type: Sequelize.STRING
    },
    extra: {
      type: Sequelize.JSON,
      allowNull: true
    }
  }, {});
  Article.associate = function (models) {
    // associations can be defined here
  };
  return Article;
};