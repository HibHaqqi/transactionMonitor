const express = require("express");
const expanse = express.Router();
const ExpansesController = require("../../controllers/expanses.controller");
const expansesController = new ExpansesController();

// CRUD Expanses
expanse.post("/v1/add",  expansesController.addExpanses);
expanse.put("/v1/edit/:id", expansesController.editExpanses);
expanse.delete("/v1/delete/:id", expansesController.deleteExpanses);

//get data Expanses
expanse.get("/v1/totalmonthly",  expansesController.totalMonthlyExpanses);
expanse.get("/v1/recent", expansesController.recentExpanses)
expanse.get("/v1/filter", expansesController.TotalExpansesByFilterMonth)


module.exports =expanse;