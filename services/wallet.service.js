const { Wallet,sequelize,ExpansesTransaction,IncomeTransaction } = require("../models");

class WalletService {
  // add new wallet
  async addWallet(payload) {
    const { user_id, category, description } = payload;
    try {
      const newWallet = await Wallet.create({
        user_id,
        category,
        description,
      });
      return newWallet;
    } catch (error) {
      console.error("Failed to create new wallet:", error);
    }
  }
  // fetch data income - expanse per wallet per id
  async getWalletByUserId(userId) {
    const wallet = await Wallet.findAll({
      where: { user_id: userId },
      attributes: ["id", "category"],
    });
    return wallet;
  }
  async getSaldoMonthly(userId,walletId) {
    const result = await sequelize.query(
      `
      SELECT
        user_id,
        wallet_id,
        DATE_FORMAT(date, '%Y-%m') AS month,
        SUM(SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END) - SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END)) AS totalTransaction
      FROM
        (
          SELECT
            'expense' AS type,
            user_id,
            wallet_id,
            date,
            amount
          FROM
            ExpenseTransaction
          WHERE
            user_id = :userId
            AND wallet_id = :walletId
          UNION ALL
          SELECT
            'income' AS type,
            user_id,
            wallet_id,
            date,
            amount
          FROM
            IncomeTransaction
          WHERE
            user_id = :userId
            AND wallet_id = :walletId
        ) AS combined
      GROUP BY
        user_id, wallet_id, month
      `,
      {
        replacements: { userId,walletId },
        type: sequelize.QueryTypes.SELECT,
      }
    );

    res.json(result);
  }
}

module.exports = WalletService;
