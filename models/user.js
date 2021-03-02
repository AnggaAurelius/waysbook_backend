"use strict";
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define(
    "User",
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      role: DataTypes.STRING,
      gender: DataTypes.STRING,
      phone: DataTypes.STRING,
      address: DataTypes.STRING,
      avatar: DataTypes.STRING,
    },
    {}
  );
  user.associate = function (models) {
    // associations can be defined here
  };
  return User;
};
