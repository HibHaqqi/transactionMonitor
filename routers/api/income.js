const express = require("express");
const income = express.Router();
const IncomeController = require("../../controllers/income.controller");

const incomeController = new IncomeController();

// CRUD Income
income.post("/v1/addincome", incomeController.addIncome);
income.put("/v1/editincome/:id", incomeController.editIncome);
income.delete("/v1/deleteincome/:id", incomeController.deleteIncome);

//get data Income
income.get("/v1/totalmonthlyincome", incomeController.totalMonthlyIncome);
income.get("/v1/recentincome", incomeController.recentIncome);

module.exports = income;
