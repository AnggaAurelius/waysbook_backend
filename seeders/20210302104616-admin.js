"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Users", [
      {
        fullName: "aku",
        email: "anggaaurelius@gmail.com",
        password:
          "$2b$10$k4oZR/7WRr2hG0ue3hKBiOj7YIjHAmQV1OvO4q9xA4.XFI1G3X/pe",
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

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Users", null, {});
  },
};
