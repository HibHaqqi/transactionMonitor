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
/**
 * @swagger
 * /api/expanse/v1/delete/{id}:
 *   delete:
 *     tags: [Expanse]
 *     summary: Delete an expense transaction by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the expense transaction to delete.
 *     responses:
 *       '201':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message: berhasil hapus transaksi
 *               data:
 *                 // Include relevant details if needed
 *       '400':
 *         description: Bad Request. Check the request parameters and try again.
 *         content:
 *           application/json:
 *             example:
 *               message: Transaction not found
 *       '409':
 *         description: Conflict. Failed to delete expense transaction.
 *         content:
 *           application/json:
 *             example:
 *               message: Error message
 *               stack: Error stack trace
 */
expanse.delete("/v1/delete/:id", expansesController.deleteExpanses);

//get data Expanses
/**
 * @swagger
 * /api/expanse/v1/totalmonthly:
 *   get:
 *     tags: [Expanse]
 *     summary: Get total monthly expanses
 *     responses:
 *       '201':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               status: success
 *               data:
 *                 - month: '2023-11-01T00:00:00.000Z'
 *                   total_amount: 500
 *       '400':
 *         description: Failed response
 *         content:
 *           application/json:
 *             example:
 *               status: failed
 *               message: Error message
 *               stack: Error stack trace
 */
expanse.get("/v1/totalmonthly",  expansesController.totalMonthlyExpanses);

/**
 * @swagger
 * /api/expanse/v1/recent:
 *   get:
 *     tags: [Expanse]
 *     summary: Get recent expanses 5 input
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               status: success
 *               data:
 *                 - id: 12
 *                   expanses_id: Housing
 *                   amount: 10000
 *                   date_transaction: Jul 06, 23
 *                   wallet: ATM Mandiri
 *                 - id: 14
 *                   expanses_id: Groceries
 *                   amount: 20000
 *                   date_transaction: Jul 06, 23
 *                   wallet: ATM Mandiri
 *       '400':
 *         description: Failed response
 *         content:
 *           application/json:
 *             example:
 *               status: failed
 *               message: Error message
 *               stack: Error stack trace
 */
expanse.get("/v1/recent", expansesController.recentExpanses)
/**
 * @swagger
 * /api/expanse/v1/filter:
 *   get:
 *     tags: [Expanse]
 *     summary: Filter expanses by month and year
 *     parameters:
 *       - in: query
 *         name: selectedMonth
 *         schema:
 *           type: string
 *         required: true
 *         description: The selected month (e.g., 05).
 *       - in: query
 *         name: selectedYear
 *         schema:
 *           type: string
 *         required: true
 *         description: The selected year (e.g., 2023).
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               status: success
 *               data:
 *                 - total_amount: 10000
 *                   category: "Food & Drink"
 *                 - total_amount: 10000
 *                   category: "Groceries"
 *       '400':
 *         description: Failed response
 *         content:
 *           application/json:
 *             example:
 *               status: failed
 *               message: Error message
 *               stack: Error stack trace
 */


expanse.get("/v1/filter", expansesController.TotalExpansesByFilterMonth)

expanse.get("/v1/getall",expansesController.AllExpanses)


module.exports =expanse;