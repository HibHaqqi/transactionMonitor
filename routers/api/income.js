const express = require("express");
const income = express.Router();
const IncomeController = require("../../controllers/income.controller");

const incomeController = new IncomeController();

/**
 * @swagger
 * tags:
 *   - name: Income
 *     description: Operations related to income management.
 */
// CRUD Income

/**ADD
 * @swagger
 * /api/income/v1/add:
 *   post:
 *     tags: [Income]
 *     summary: Add a new income transaction.
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
 *               income_id:
 *                 type: integer
 *                 description: The income category's ID.
 *                 example: 2
 *               amount:
 *                 type: number
 *                 description: The transaction amount.
 *                 example: 10000
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
 *         description: income transaction added successfully.
 *         content:
 *           application/json:
 *             example:
 *               id: 1
 *               wallet_id: 1
 *               income_id: 2
 *               amount: 9900
 *               date_transaction: "2023-06-07T00:00:00.000Z"
 *               description: "Uji coba"
 *       400:
 *         description: Bad Request. Check the request payload and try again.
 *       500:
 *         description: Internal Server Error. Failed to add income transaction.
 */
income.post("/v1/add", incomeController.addIncome);
/**EDIT
 * @swagger
 * /api/income/v1/edit/{id}:
 *   put:
 *     tags: [Income]
 *     summary: Edit an existing income transaction.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the income transaction to edit.
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
 *               income_id:
 *                 type: integer
 *                 description: The income category's ID.
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
 *               income_id: 2
 *               amount: 14000000
 *               date_transaction: "2023-06-07T00:00:00.000Z"
 *               description: "Updated description"
 *       400:
 *         description: Bad Request. Check the request payload and try again.
 *       404:
 *         description: Not Found. Expense transaction with the specified ID not found.
 *       500:
 *         description: Internal Server Error. Failed to update income transaction.
 */
income.put("/v1/edit/:id", incomeController.editIncome);
/**
 * @swagger
 * /api/income/v1/delete/{id}:
 *   delete:
 *     tags: [Income]
 *     summary: Delete an income transaction by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the income transaction to delete.
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
 *         description: Conflict. Failed to delete income transaction.
 *         content:
 *           application/json:
 *             example:
 *               message: Error message
 *               stack: Error stack trace
 */
income.delete("/v1/delete/:id", incomeController.deleteIncome);

//get data Income
/**
 * @swagger
 * /api/income/v1/totalmonthly:
 *   get:
 *     tags: [Income]
 *     summary: Get total monthly income
 *     responses:
 *       '201':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               status: success
 *               data:
 *                 - month: '2023-11-01T00:00:00.000Z'
 *                   total_amount: 140000000
 *       '400':
 *         description: Failed response
 *         content:
 *           application/json:
 *             example:
 *               status: failed
 *               message: Error message
 *               stack: Error stack trace
 */
income.get("/v1/totalmonthly", incomeController.totalMonthlyIncome);
/**
 * @swagger
 * /api/income/v1/recent:
 *   get:
 *     tags: [Income]
 *     summary: Get recent income 5 input
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               status: success
 *               data:
 *                 - id: 12
 *                   income_id: Gaji
 *                   amount: 10000
 *                   date_transaction: Jul 06, 23
 *                   wallet: ATM Mandiri
 *                 - id: 14
 *                   income_id: Incentive
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
income.get("/v1/recent", incomeController.recentIncome);
income.get("/v1/getall",incomeController.allIncome)

module.exports = income;
