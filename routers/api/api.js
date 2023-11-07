const express = require("express");
const LoginRegisController = require("../../controllers/loginregis.controller");
const api = express.Router();
const {Expanses} =require("../../models");

const loginRegisController = new LoginRegisController
api.post('/v1/regis', loginRegisController.postRegis);
api.get('/v1/category',async (req,res)=>{
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