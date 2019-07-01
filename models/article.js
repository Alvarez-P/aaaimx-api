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
      unique: true,
      allowNull: false
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false
    },
    topic: {
      type: Sequelize.STRING,
      allowNull: false
    },
    document: {
      type: Sequelize.STRING,
      allowNull: false
    },
    date_pub: {
      type: Sequelize.DATE,
      allowNull: false
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