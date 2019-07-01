'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Articles', {
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
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Articles');
  }
};