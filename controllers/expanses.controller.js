const ExpansesService = require("../services/expanses.service");

const expansesService = new ExpansesService();

class ExpansesController {
  // add expanses transaction
  async addExpanses(req, res) {
    try {
      const dataCookie = req.user;
      const user_id = dataCookie.id;
      const payload = {...req.body,user_id}
      console.log(user_id);
      const addExpanses = await expansesService.addExpanses(payload);
      res
        .status(201)
        .json({ message: "berhasil menambahkan transaksi", data: addExpanses });
    } catch (error) {
      res.status(400).json({
        status: "failed",
        message: error.message,
      });
    }
  }
  async editExpanses(req, res) {
    try {
      const id = req.params.id;
      const payload = { ...req.body, id: parseInt(id, 10) };
      const editExpanses = await expansesService.editExpanses(payload);
      res
        .status(201)
        .json({ message: "berhasil  edit transaksi", data: editExpanses });
    } catch (error) {
      if (error.message === "Expanse Transaction Not found") {
        res.status(400).json({ message: "Expanse Transaction Not found" });
      } else {
        res.status(409).json({ message: error.message, stack: error });
      }
    }
  }
  async deleteExpanses(req, res) {}
  //get data expanses total secara bulanan untuk pie chart bar chart
  async totalMonthlyExpanses(req, res) {}
  //get data expanses total secara bulanan dengan category untuk stack chart
  async totalMonthlyExpansesWithCategory(req, res) {}
  // data table untuk expanses terakhir
  async recentExpanses(req, res) {}

  // memanggil data bulan yang ada dalam data base untuk di tampilkan di menu drop down
  async filterAvailableMonthlyExpanses(req, res) {}
}

module.exports = ExpansesController;
