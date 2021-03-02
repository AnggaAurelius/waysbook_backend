"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PurchasedBook extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      PurchasedBook.belongsTo(models.Book, {
        as: "book",
        foreignKey: "bookId",
      });
    }
  }
  PurchasedBook.init(
    {
      user: DataTypes.INTEGER,
      bookId: DataTypes.INTEGER,
      transaction: DataTypes.INTEGER,
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "PurchasedBook",
    }
  );
  return PurchasedBook;
};
