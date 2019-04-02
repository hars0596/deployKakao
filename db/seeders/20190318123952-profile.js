'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Profiles', [
      {
        name: "admin",
        email: "htrocks0596@gmail.com",
        password: "$2a$10$AqJh6VMa1J0DSs/Rg6pmi.C2ChVB.M4yJWh5ffaOTI5UyfQoG.QSK",
        phoneNumber: "7889456123",
        photoUrl: "admin.jpg",
        createdBy: 0,
        roleId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        isVerified: true
      },

    ])
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
