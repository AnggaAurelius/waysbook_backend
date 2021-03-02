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
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {},
};
