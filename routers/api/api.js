const express = require("express");
const LoginRegisController = require("../../controllers/loginregis.controller");
const api = express.Router();

const loginRegisController = new LoginRegisController
api.post('/v1/regis', loginRegisController.postRegis);


module.exports = api;