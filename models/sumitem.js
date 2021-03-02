'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class sumItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  sumItem.init({
    user: DataTypes.INTEGER,
    qty: DataTypes.INTEGER,
    pay: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'sumItem',
  });
  return sumItem;
};