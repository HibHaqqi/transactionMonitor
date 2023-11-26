const {
  Wallet,
  IncomeTransaction,
  ExpansesTransaction,
  sequelize,
} = require("../models");

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

  async getWalletByUserId(userId) {
    const wallet = await Wallet.findAll({
      where: { user_id: userId },
      attributes: ["id", "category"],
    });
    return wallet;
  }
  // fetch data income - expanse per wallet per id
  async getSaldoByWallet(userId) {
    try {
      const wallets = await Wallet.findAll({
        where: { user_id: userId },
        include: [
          {
            model: IncomeTransaction,
            attributes: [
              [sequelize.fn('SUM', sequelize.col('IncomeTransactions.amount')), 'total_income'],
            ],
            group: ['Wallet.id'], // Include the necessary columns in the group
          },
          {
            model: ExpansesTransaction,
            attributes: [
              [sequelize.fn('SUM', sequelize.col('ExpansesTransactions.amount')), 'total_expense'],
            ],
            group: ['Wallet.id'], // Include the necessary columns in the group
          },
        ],
        raw: true,
        nest: true,
        group: ['Wallet.id'], // Include the necessary columns in the group at the top level
      });

      // Process the result to calculate saldo for each wallet
      const formattedSaldoData = wallets.map((wallet) => {
        const totalIncome = wallet.IncomeTransactions ? wallet.IncomeTransactions.total_income : 0;
        const totalExpense = wallet.ExpansesTransactions ? wallet.ExpansesTransactions.total_expense : 0;

        // Calculate saldo based on total income and total expense
        const saldo = totalIncome - totalExpense;

        return {
          category : wallet.category,
          saldo,
        };
      });

      return formattedSaldoData;
    } catch (error) {
      console.error("Error fetching saldo data:", error);
      throw error;
    }
  }
}

module.exports = WalletService;
