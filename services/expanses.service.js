const {
  ExpansesTransaction,
  sequelize,
  Expanses,
  Wallet,
} = require("../models");
const { Sequelize,Op } = require("sequelize");

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
  async editExpanses(payload,id) {
    const {
      user_id,
      wallet_id,
      amount,
      expanses_id,
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
    const  id  = payload;
    console.log(id);
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

  async recentExpanse(userId) {
    const transactions = await ExpansesTransaction.findAll({
      where: { user_id: userId },
      limit: 5,
      order: [["date_transaction", "DESC"]],
      attributes: ["id", "amount", "date_transaction"],
      include: [
        { model: Expanses, attribute: ["category"] },
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
        expanses_id: transaction.Expanse.category,
        amount: transaction.amount,
        date_transaction: formattedDate,
        wallet: transaction.Wallet.category,
      };
    });
    return formattedTransactions;
  }

  async totalExpansesFilterByMonth(userId, selectedMonth, selectedYear) {
    const result = await ExpansesTransaction.findAll({
      attributes: [
        [
          Sequelize.fn(
            "DATE_TRUNC",
            "month",
            Sequelize.col("date_transaction")
          ),
          "month",
        ],
        [Sequelize.col("expanses_id"), "category"],
        [Sequelize.fn("SUM", Sequelize.col("amount")), "total_amount"],
      ],
      where: {
        user_id: userId,
        date_transaction: {
          [Op.and]: [
            { [Op.gte]: new Date(selectedYear, selectedMonth - 1, 1) },
            { [Op.lt]: new Date(selectedYear, selectedMonth, 1) },
          ],
        },
      },
      include: {
        model: Expanses,
        attributes: ["category"], // Assuming 'category' is a field in the Expanses model
      },
      group: ["expanses_id", "month", "Expanse.id", "Expanse.category"],
      order: [Sequelize.col("month")],
    });

   

    return result;
    
  }
  async getAllExpanse(payload){
    const {user_id} = payload
    const result = await ExpansesTransaction.findAll({where:{user_id}})
    return result
  }
}

// jumlah total pengeluaran per bulan
// jumlah total pengeluaran per category filter per bulan
// list pengeluaran terakhir
// transactionByMonthCategory -- fetch data untuk stack chart catergory per month

// --------------------- support api untuk form-----------

// filter data by month & year transaction menu dropdown - getAvailableMonthsAndYears

module.exports = ExpansesService;
