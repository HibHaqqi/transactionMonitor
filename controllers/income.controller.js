
const IncomeService = require("../services/income.service");

const incomeService = new IncomeService();

class IncomeController{
    async addIncome(req, res) {
        try {
          const dataCookie = req.user;
          const user_id = dataCookie.id;
          const payload = { ...req.body, user_id };
          console.log(user_id);
          const addIncome = await incomeService.addIncome(payload);
          res
            .status(201)
            .json({ message: "berhasil menambahkan transaksi", data: addIncome });
        } catch (error) {
          res.status(400).json({
            status: "failed",
            message: error.message,
          });
        }
      }
      async editIncome(req, res) {
        try {
          const id = req.params.id;
          const payload = { ...req.body, id: parseInt(id, 10) };
          const editIncome = await incomeService.editIncome(payload);
          res
            .status(201)
            .json({ message: "berhasil  edit transaksi", data: editIncome });
        } catch (error) {
          if (error.message === "Expanse Transaction Not found") {
            res.status(400).json({ message: "Expanse Transaction Not found" });
          } else {
            res.status(409).json({ message: error.message, stack: error });
          }
        }
      }
      async deleteIncome(req, res) {
        try {
          const id = req.params.id;
          const payload = { ...req.body, id: parseInt(id, 10) };
          const deleteIncome = await incomeService.deleteIncome(payload);
          res
            .status(201)
            .json({ message: "berhasil  hapus transaksi", data: deleteIncome });
        } catch (error) {
          if (error.message === "Transaction not found") {
            res.status(400).json({ message: "Transaction not found" });
          } else {
            res.status(409).json({ message: error.message, stack: error });
          }
        }
      }
      //get data Income total secara bulanan untuk pie chart bar chart
      async totalMonthlyIncome(req, res) {
        try {
          const dataCookie = req.user;
          const user_id = dataCookie.id;
    
          const totalMonthlyIncome = await incomeService.totalMonthlyIncome(
            user_id
          );
          res.status(201).json({ status: "success", data: totalMonthlyIncome });
        } catch (error) {
          res.status(400).json({
            status: "failed",
            message: error.message,
            stack: error,
          });
        }
      }
      //get data Income total secara bulanan dengan category untuk stack chart
      async totalMonthlyIncomeWithCategory(req, res) {}
      // data table untuk Income terakhir
      async recentIncome(req, res) {
        try {
          const dataCookie = req.user;
          const user_id = dataCookie.id;
          const recentIncome =
            await incomeService.recentIncome(user_id);
            res.status(201).json({ status: "success", data: recentIncome });
        } catch (error) {
          res.status(400).json({
            status: "failed",
            message: error.message,
            stack: error,
          });
        }
      }
    
      // memanggil data bulan yang ada dalam data base untuk di tampilkan di menu drop down
      async filterAvailableMonthlyIncome(req, res) {}
    }
module.exports = IncomeController;