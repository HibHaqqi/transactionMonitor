const express = require("express");
const LoginRegisController = require("../../controllers/loginregis.controller");
const api = express.Router();
const {Expanses} =require("../../models");
const WalletController = require("../../controllers/wallet.controller");

// JWT
// use this as middleware to use decoded token
const {extractToken} = require("../../middleware/jwt")


const loginRegisController = new LoginRegisController
const walletController = new WalletController
api.post('/v1/regis', loginRegisController.postRegis);
api.post('/v1/login', loginRegisController.userLogin);
api.post('/v1/addwalet', walletController.addWallet);



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