'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Roles', [
      {
        roleName: "Admin",
        roleId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        roleName: "Master",
        roleId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        roleName: "User",
        roleId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      }

    ])
  },

  down: (queryInterface, Sequelize) => {

  }
};
