const { ExpansesTransaction , sequelize} = require("../models");
const { Sequelize } = require("sequelize");

class ExpansesService {
  // expanses add
  async addExpanses(payload) {
    const {
      user_id,
      wallet_id,
      expanses_id,
      amount,
      date_transaction,
      description,
    } = payload;
    try {
      const addExpanses = await ExpansesTransaction.create({
        user_id,
        wallet_id,
        expanses_id,
        amount,
        date_transaction,
        description,
      });
      return addExpanses;
    } catch (error) {
      console.error("Failed to create transaction:", error);
    }
  }
  async editExpanses(payload) {
    const {
      id,
      user_id,
      wallet_id,
      expanses_id,
      amount,
      date_transaction,
      description,
    } = payload;
    try {
      const expanseTrans = await ExpansesTransaction.update(
        {
          user_id,
          wallet_id,
          expanses_id,
          amount,
          date_transaction,
          description,
        },
        {
          where: { id: id },
        }
      );

      if (expanseTrans[0] === 0) {
        throw new Error("Expanse Transaction Not found");
      }
      return expanseTrans;
    } catch (error) {
      throw new Error("Data tidak lengkap");
    }
  }
  async deleteExpanses(payload) {
    const { id } = payload;
    try {
      const deletedExpanse = await ExpansesTransaction.destroy({
        where: { id: id }, // Match by the 'id' field
      });
      if (deletedExpanse === 0) {
        throw new Error("Transaction not found");
      }
      return deletedExpanse;
    } catch (error) {
      throw new Error("Data tidak berhasil dihapus");
    }
  }
  async totalMonthlyExpanses(userId) {
    const result = await sequelize.query(
      `SELECT
                    DATE_TRUNC('month', date_transaction) AS month,
                    SUM(amount) AS total_amount 
                FROM "ExpansesTransactions"
                WHERE user_id = :userId
                GROUP BY month
                ORDER BY month;`,
      { replacements: { userId: userId }, type: Sequelize.QueryTypes.SELECT }
    );
    return result;
  }
}

// jumlah total pengeluaran per bulan
// jumlah total pengeluaran per category filter per bulan
// list pengeluaran terakhir
// transactionByMonthCategory -- fetch data untuk stack chart catergory per month

// --------------------- support api untuk form-----------

// filter data by month & year transaction menu dropdown - getAvailableMonthsAndYears

module.exports = ExpansesService;
