const ExpansesService = require("../services/expanses.service");

const expansesService = new ExpansesService


class ExpansesController{
    // add expanses transaction
    async addExpanses(req,res){
        try {
            const payload = req.body
            const addExpanses = await expansesService.addExpanses(payload);
            res.status(201).json({ message: "berhasil menambahkan transaksi", data: addExpanses });
        } catch (error) {
            res.status(400).json({
                status: "failed",
                message: error.message,
               
                });
        }

    }
    async editExpanses(req,res){

    }
    async deleteExpanses(req,res){

    }
    //get data expanses total secara bulanan untuk pie chart bar chart 
    async totalMonthlyExpanses(req,res){
        
    }
    //get data expanses total secara bulanan dengan category untuk stack chart
    async totalMonthlyExpansesWithCategory(req,res){

    }
    // data table untuk expanses terakhir 
    async recentExpanses(req,res){

    }

    // memanggil data bulan yang ada dalam data base untuk di tampilkan di menu drop down
    async filterAvailableMonthlyExpanses(req,res){

    }
}

module.exports = ExpansesController;