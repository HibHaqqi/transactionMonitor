const express = require("express");
const HomeController = require("../../controllers/home.controller");
const api = express.Router();

const homeController = new HomeController
api.get('/v1/news', homeController.getNews);
api.post('/v1/news', homeController.storeNews);

module.exports = api;