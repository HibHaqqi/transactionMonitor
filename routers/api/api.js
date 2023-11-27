const express = require("express");
const api = express.Router();
const users= require("./users")
const expanse = require("./expanse")
const wallet = require("./wallet")
const income = require("./income");
const { verifyTokens, extractToken } = require("../../middleware/jwt");
const { Expanses } = require("../../models");
const { User } = require("../../models");


// cloudinary
const uploader = require('../../middleware/uploader');
const uploadCloudinary = require('../../libs/upload-cloudinary');
const user = require("../../models/user");
// JWT
// use this as middleware to use decoded token
// api.use(extractToken);


api.use('/users',users);
api.use('/expanse',expanse);
api.use('/income',income)
api.use('/wallet',wallet);



module.exports = api;
