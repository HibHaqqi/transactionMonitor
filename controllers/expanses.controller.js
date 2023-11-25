const ExpansesService = require("../services/expanses.service");

const expansesService = new ExpansesService();

class ExpansesController {
  // add expanses transaction
  async addExpanses(req, res) {
    console.log(req.body);
    try {
      const payload = req.body;
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
      
      const payload = req.body
      const id = req.params.id
      const editExpanses = await expansesService.editExpanses(payload,id);
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
  async deleteExpanses(req, res) {
    try {
    
      const payload = req.params.id
      const deleteExpanses = await expansesService.deleteExpanses(payload);
      res
        .status(201)
        .json({ message: "berhasil  hapus transaksi", data: deleteExpanses });
    } catch (error) {
      if (error.message === "Transaction not found") {
        res.status(400).json({ message: "Transaction not found" });
      } else {
        res.status(409).json({ message: error.message, stack: error });
      }
    }
  }
  //get data expanses total secara bulanan untuk pie chart bar chart
  async totalMonthlyExpanses(req, res) {
    try {
      
      const user_id = req.body
      
      const totalMonthlyExpanses = await expansesService.totalMonthlyExpanses(
        user_id
      );
      res.status(201).json({ status: "success", data: totalMonthlyExpanses });
    } catch (error) {
      res.status(400).json({
        status: "failed",
        message: error.message,
        stack: error,
      });
    }
  }
  //get data expanses total secara bulanan dengan category untuk stack chart
  async totalMonthlyExpansesWithCategory(req, res) {}
  // data table untuk expanses terakhir
  async recentExpanses(req, res) {
    try {
     
      const user_id = req.body
      const recentExpanse = await expansesService.recentExpanse(user_id);
      res.status(201).json({ status: "success", data: recentExpanse });
    } catch (error) {
      res.status(400).json({
        status: "failed",
        message: error.message,
        stack: error,
      });
    }
  }

  // memanggil data bulan yang ada dalam data base untuk di tampilkan di menu drop down
  async TotalExpansesByFilterMonth(req, res) {
    try {
      const user_id = req.body
      const selectedMonth = req.query.selectedMonth;
      const selectedYear = req.query.selectedYear;
      if (!selectedMonth || !selectedYear) {
        return res.status(400).json({
          status: "failed",
          message: "Both selectedYear and selectedMonth are required.",
        });
      }
      const totalExpansesFilterByMonth =
        await expansesService.totalExpansesFilterByMonth(user_id,selectedMonth,selectedYear);
      const transformedExpenses = totalExpansesFilterByMonth.map((item) => ({
        total_amount: parseFloat(item.getDataValue("total_amount")),
        category: item.Expanse.category,
      }));

      res.status(201).json({ status: "success", data: transformedExpenses });
    } catch (error) {
      res.status(400).json({
        status: "failed",
        message: error.message,
        stack: error,
      });
    }
  }
  async AllExpanses(req,res){
  try {
    const payload = req.query
    const AllExpanses = await expansesService.getAllExpanse(payload)
    res.status(200).json({ status: "success", data: AllExpanses })
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error.message,
      stack: error,
    });
  }
  }
}



module.exports = ExpansesController;
