"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Users", [
      {
        name: "aku",
        email: "anggaaurelius@gmail.com",
        password: "12345678",
        role: "ADMIN",
        gender: "Male",
        phone: "1234567",
        address: "mojokerto",
        avatar: "profile.png",
        createdAt: "2017-01-01",
        updatedAt: "2019-01-11",
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {},
};
