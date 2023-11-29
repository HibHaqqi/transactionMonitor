const express = require("express");
const api = express.Router();
const users= require("./users")
const expanse = require("./expanse")
const wallet = require("./wallet")
const income = require("./income");
const { authenticateToken } = require("../../middleware/jwt");




api.use('/users',users);
api.use('/expanse',authenticateToken,expanse);
api.use('/income',authenticateToken,income)
api.use('/wallet',authenticateToken,wallet);



module.exports = api;
