const express = require("express");
const api = express.Router();
const users= require("./users")
const expanse = require("./expanse")
const wallet = require("./wallet")
const income = require("./income");
const { verifyTokens, extractToken } = require("../../middleware/jwt");
const { Expanses } = require("../../models");

// JWT
// use this as middleware to use decoded token
api.use(extractToken);


api.use('/users',users);
api.use('/expanse',extractToken,expanse);
api.use('/income',extractToken,income)
api.use('/wallet',extractToken,wallet);











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
