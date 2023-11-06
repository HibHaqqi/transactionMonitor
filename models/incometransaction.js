'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class IncomeTransaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User,{
        foreignKey :`user_id`,
        onDelete: "CASCADE"
      })
      this.belongsTo(models.Wallet, {
        foreignKey : "wallet_id",
        onDelete: "CASCADE" // jika wallet dihapus maka transaksi dihapus
      })
      this.belongsTo(models.Income, {
        foreignKey : "income_id",
        onDelete: "CASCADE" // jika wallet dihapus maka transaksi dihapus
      })
    }
  }
  IncomeTransaction.init({
    user_id: DataTypes.INTEGER,
    wallet_id: DataTypes.INTEGER,
    income_id: DataTypes.INTEGER,
    amount: DataTypes.INTEGER,
    date_transaction: DataTypes.DATE,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'IncomeTransaction',
  });
  return IncomeTransaction;
};