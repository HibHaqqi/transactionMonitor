const express = require("express");
const LoginRegisController = require("../../controllers/loginregis.controller");
const api = express.Router();
const {Expanses} =require("../../models");
const WalletController = require("../../controllers/wallet.controller");
const ExpansesController = require("../../controllers/expanses.controller");

const loginRegisController = new LoginRegisController
const walletController = new WalletController
const expansesController = new ExpansesController
api.post('/v1/regis', loginRegisController.postRegis);
api.post('/v1/login', loginRegisController.userLogin);
api.post('/v1/addwallet', walletController.addWallet);
api.post('/v1/addexpanse', expansesController.addExpanses)
api.put('/v1/editexpanse/:id', expansesController.editExpanses)


api.get('/v1/category',loginRegisController.isAuthenticated,async (req,res)=>{
    const expanse = await Expanses.findAll();
    try {
         res.status(200).json({
            status : "success",
            data : expanse
            
    })   
   
    } catch (error) {
       res.status(400).json({
            status: "failed",
            message: error.message,
            stack:error
            
       })
            
    }
    
})

module.exports = api;