const express = require("express");
const expanse = express.Router();
const ExpansesController = require("../../controllers/expanses.controller");
const expansesController = new ExpansesController();

// CRUD Expanses
/**
 * @swagger
 * tags:
 *   - name: Expanse
 *     description: Operations related to expense management.
 */

/**ADD
 * @swagger
 * /api/expanse/v1/add:
 *   post:
 *     tags: [Expanse]
 *     summary: Add a new expense transaction.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               wallet_id:
 *                 type: integer
 *                 description: The wallet's ID.
 *                 example: 1
 *               expanses_id:
 *                 type: integer
 *                 description: The expense category's ID.
 *                 example: 2
 *               amount:
 *                 type: number
 *                 description: The transaction amount.
 *                 example: 9900
 *               date_transaction:
 *                 type: string
 *                 format: date
 *                 description: The date of the transaction (DD/MM/YYYY).
 *                 example: "07/06/2023"
 *               description:
 *                 type: string
 *                 description: Additional description for the transaction.
 *                 example: "Uji coba"
 *     responses:
 *       201:
 *         description: Expense transaction added successfully.
 *         content:
 *           application/json:
 *             example:
 *               id: 1
 *               wallet_id: 1
 *               expanses_id: 2
 *               amount: 9900
 *               date_transaction: "2023-06-07T00:00:00.000Z"
 *               description: "Uji coba"
 *       400:
 *         description: Bad Request. Check the request payload and try again.
 *       500:
 *         description: Internal Server Error. Failed to add expense transaction.
 */
expanse.post("/v1/add",  expansesController.addExpanses);

/**EDIT
 * @swagger
 * /api/expanse/v1/edit/{id}:
 *   put:
 *     tags: [Expanse]
 *     summary: Edit an existing expense transaction.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the expense transaction to edit.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: integer
 *                 description: The user's ID.
 *                 example: 1
 *               wallet_id:
 *                 type: integer
 *                 description: The wallet's ID.
 *                 example: 1
 *               expanses_id:
 *                 type: integer
 *                 description: The expense category's ID.
 *                 example: 2
 *               amount:
 *                 type: number
 *                 description: The transaction amount.
 *                 example: 9900
 *               date_transaction:
 *                 type: string
 *                 format: date
 *                 description: The date of the transaction (DD/MM/YYYY).
 *                 example: "07/06/2023"
 *               description:
 *                 type: string
 *                 description: Additional description for the transaction.
 *                 example: "Updated description"
 *     responses:
 *       200:
 *         description: Expense transaction updated successfully.
 *         content:
 *           application/json:
 *             example:
 *               id: 1
 *               user_id: 1
 *               wallet_id: 1
 *               expanses_id: 2
 *               amount: 9900
 *               date_transaction: "2023-06-07T00:00:00.000Z"
 *               description: "Updated description"
 *       400:
 *         description: Bad Request. Check the request payload and try again.
 *       404:
 *         description: Not Found. Expense transaction with the specified ID not found.
 *       500:
 *         description: Internal Server Error. Failed to update expense transaction.
 */
expanse.put("/v1/edit/:id", expansesController.editExpanses);

expanse.delete("/v1/delete/:id", expansesController.deleteExpanses);

//get data Expanses
expanse.get("/v1/totalmonthly",  expansesController.totalMonthlyExpanses);
expanse.get("/v1/recent", expansesController.recentExpanses)
expanse.get("/v1/filter", expansesController.TotalExpansesByFilterMonth)


module.exports =expanse;