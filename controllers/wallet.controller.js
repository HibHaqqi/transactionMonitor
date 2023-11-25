const WalletService = require("../services/wallet.service");

const ExpansesService = require("../services/expanses.service");
const IncomeService = require("../services/income.service");
const formatMonth = require("../middleware/formatmonth");
const walletService = new WalletService();
const expansesService = new ExpansesService();

const incomeService = new IncomeService();

class WalletController {
  async addWallet(req, res) {
    try {
      const payload = req.body;
      const newWallet = await walletService.addWallet(payload);
      res
        .status(201)
        .json({ message: "User berhasil dibuat", data: newWallet });
    } catch (error) {
      res.status(400).json({
        status: "failed",
        message: error.message,
      });
    }
  }
  async getWalletByUserId(req, res) {
    try {
      const dataCookie = req.user;
      const user_id = dataCookie.id;
      const getWalletByUserId = await walletService.getWalletByUserId(user_id);
      res.status(201).json({ status: "success", data: getWalletByUserId });
    } catch (error) {
      res.status(400).json({
        status: "failed",
        message: error.message,
        stack: error,
      });
    }
  }

  async getSaldoByWallet(req,res) {
    try {
      const user_id = req.query.user_id
      const getWalletByUserId = await walletService.getSaldoByWallet(user_id);
      res.status(201).json({ status: "success", data: getWalletByUserId });
    } catch (error) {
      res.status(400).json({
        status: "failed",
        message: error.message,
        stack: error,
      });
    }
  }

  async getSaldoMonthly(req, res) {
    try {
      const dataCookie = req.body;
      const user_id = dataCookie.user_id;
      const expenseData = await expansesService.totalMonthlyExpanses(user_id);
      const incomeData = await incomeService.totalMonthlyIncome(user_id);
      // Create sets of unique months for both expense and income data
      const expenseMonths = new Set(
        expenseData.map((expense) => formatMonth(expense.month))
      );
      const incomeMonths = new Set(
        incomeData.map((income) => formatMonth(income.month))
      );

      // Combine both sets to get a unique set of all months
      const allMonths = new Set([...expenseMonths, ...incomeMonths]);

      // Convert the set to an array and sort it
      const sortedMonths = Array.from(allMonths).sort();

      // Build the final result by iterating through sorted months
      const mergedData = sortedMonths.map((month) => {
        const correspondingExpense = expenseData.find(
          (expense) => formatMonth(expense.month) === month
        ) || { month, total_amount: 0 };
        const correspondingIncome = incomeData.find(
          (income) => formatMonth(income.month) === month
        ) || { month, total_amount: 0 };

        return {
          month,
          total_expense: correspondingExpense.total_amount,
          total_income: correspondingIncome.total_amount,
          saldo:
            correspondingIncome.total_amount -
            correspondingExpense.total_amount,
        };
      });
      res.status(201).json({ status: "success", data: mergedData });
    } catch (error) {
      res.status(400).json({
        status: "failed",
        message: error.message,
        stack: error,
      });
    }
  }
}

module.exports = WalletController;
