const express = require("express");
const LoginRegisController = require("../../controllers/loginregis.controller");
const users = express.Router();

const loginRegisController = new LoginRegisController();

users.post("/v1/regis", loginRegisController.postRegis);
users.post("/v1/login", loginRegisController.userLogin);

users.get("/logout", (req, res) => {
    // Clear the JWT token by setting an expired cookie
    res.cookie("access-token", "", { expires: new Date(0), httpOnly: true });
    res.status(200).json({ message: 'Logout successful' });
  });


module.exports = users;