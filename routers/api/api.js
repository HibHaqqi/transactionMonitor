const express = require("express");
const LoginRegisController = require("../../controllers/loginregis.controller");
const api = express.Router();
const { Expanses } = require("../../models");
const WalletController = require("../../controllers/wallet.controller");
const ExpansesController = require("../../controllers/expanses.controller");

// JWT
// use this as middleware to use decoded token
const { verifyTokens, extractToken } = require("../../middleware/jwt");
const IncomeController = require("../../controllers/income.controller");

const loginRegisController = new LoginRegisController();
const walletController = new WalletController();
const expansesController = new ExpansesController();
const incomeController = new IncomeController();
api.use(extractToken);

api.post("/v1/regis", loginRegisController.postRegis);
api.post("/v1/login", loginRegisController.userLogin);

//Wallet 
api.post("/v1/wallet", walletController.addWallet);
api.get("/v1/wallet",verifyTokens,walletController.getWalletByUserId)

// CRUD Expanses
api.post("/v1/addexpanse", extractToken, expansesController.addExpanses);
api.put("/v1/editexpanse/:id", expansesController.editExpanses);
api.delete("/v1/deleteexpanse/:id", expansesController.deleteExpanses);

//get data Expanses
api.get("/v1/totalmonthlyexpanses", verifyTokens, expansesController.totalMonthlyExpanses);
api.get("/v1/recentexpanses", verifyTokens, expansesController.recentExpanses)
api.get("/v1/filterexpanse", expansesController.TotalExpansesByFilterMonth)

// CRUD Income
api.post("/v1/addincome", extractToken, incomeController.addIncome);
api.put("/v1/editincome/:id", incomeController.editIncome);
api.delete("/v1/deleteincome/:id", incomeController.deleteIncome);

//get data Expanses
api.get("/v1/totalmonthlyincome", verifyTokens, incomeController.totalMonthlyIncome);
api.get("/v1/recentincome", verifyTokens, incomeController.recentIncome)

api.get("/logout", (req, res) => {
  // Clear the JWT token by setting an expired cookie
  res.cookie("access-token", "", { expires: new Date(0), httpOnly: true });
  res.status(200).json({ message: 'Logout successful' });
});

api.get("/v1/category", verifyTokens, async (req, res) => {
  const expanse = await Expanses.findAll();
  try {
    res.status(200).json({
      status: "success",
      data: expanse,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error.message,
      stack: error,
    });
  }
});

module.exports = api;
