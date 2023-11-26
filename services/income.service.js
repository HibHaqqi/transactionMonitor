const { IncomeTransaction , sequelize, Income,Wallet} = require("../models");
const { Sequelize } = require("sequelize");

class IncomeService{
    // expanses add
  async addIncome(payload) {
    const {
      user_id,
      wallet_id,
      income_id,
      amount,
      date_transaction,
      description,
    } = payload;
    try {
      const addIncome = await IncomeTransaction.create({
        user_id,
        wallet_id,
        income_id,
        amount,
        date_transaction,
        description,
      });
      return addIncome;
    } catch (error) {
      console.error("Failed to create transaction:", error);
    }
  }
  async editIncome(payload,id) {
    const {
      user_id,
      wallet_id,
      income_id,
      amount,
      date_transaction,
      description,
    } = payload;
    try {
      const incomeTrans = await IncomeTransaction.update(
        {
          user_id,
          wallet_id,
          income_id,
          amount,
          date_transaction,
          description,
        },
        {
          where: { id },
        }
      );

      if (incomeTrans[0] === 0) {
        throw new Error("Expanse Transaction Not found");
      }
      return incomeTrans;
    } catch (error) {
      throw new Error("Data tidak lengkap");
    }
  }
  async deleteIncome(payload) {
    const  id = payload;
    try {
      const deletedIncome = await IncomeTransaction.destroy({
        where: { id }, // Match by the 'id' field
      });
      if (deletedIncome === 0) {
        throw new Error("Transaction not found");
      }
      return deletedIncome;
    } catch (error) {
      throw new Error("Data tidak berhasil dihapus");
    }
  }
  async totalMonthlyIncome(payload) {
    const {user_id} = payload
    const result = await sequelize.query(
      `SELECT
                    DATE_TRUNC('month', date_transaction) AS month,
                    SUM(amount) AS total_amount 
                FROM "IncomeTransactions"
                WHERE user_id = :user_id
                GROUP BY month
                ORDER BY month;`,
      { replacements: { user_id: user_id }, type: Sequelize.QueryTypes.SELECT }
    );
    return result;
  }

  async recentIncome(userId){
    const transactions = await IncomeTransaction.findAll({
      where: { user_id: userId },
      limit: 5,
      order: [["date_transaction", "DESC"]],
      attributes: ["id", "amount", "date_transaction"],
      include: [
        { model: Income, attribute: ["name"] },
        { model: Wallet, attribute: ["category"] },
      ],
    });

    const formattedTransactions = transactions.map((transaction) => {
      const formattedDate = new Intl.DateTimeFormat("en-US", {
        day: "2-digit",
        month: "short",
        year: "2-digit",
      }).format(transaction.date_transaction);

      return {
        id: transaction.id,
        income_id: transaction.Income.name,
        amount: transaction.amount,
        date_transaction: formattedDate,
        wallet: transaction.Wallet.category,
      };
    });
    return formattedTransactions;
  }
  async getAllIncome(payload){
    const {user_id} = payload
    console.log(user_id);
    const result = await IncomeTransaction.findAll({where:{user_id}})
    return result
  }
}
// income  add
// jumlah total income per bulan
// jumlah total income per category filter per bulan
// list income terakhir 


module.exports = IncomeService;