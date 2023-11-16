const express = require("express");
const wallet = express.Router();

const WalletController = require("../../controllers/wallet.controller");
const walletController = new WalletController();

//Wallet
wallet.post("/v1/addwallet", walletController.addWallet);
wallet.get("/v1/getwallet", walletController.getWalletByUserId);
wallet.get("/v1/saldomonthly", walletController.getSaldoMonthly);

module.exports = wallet;