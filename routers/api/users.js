const express = require("express");
const LoginRegisController = require("../../controllers/loginregis.controller");
const uploader = require("../../middleware/uploader");
const users = express.Router();

const loginRegisController = new LoginRegisController();
/**
 * @swagger
 * tags:
 *   - name: User
 *     description: Operations related to user management.
 */

/**
 * @swagger
 * /api/users/v1/regis:
 *   post:
 *     tags: [User]
 *     summary: Register a new user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The user's name.
 *                 example: jarwo
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The user's email.
 *                 example: haqqi08@gmail.com
 *               password:
 *                 type: string
 *                 description: The user's password.
 *                 example: jarwokuat
 *               role:
 *                 type: string
 *                 description: The user's role.
 *                 example: admin
 *     responses:
 *       201:
 *         description: User registration successful.
 *         content:
 *           application/json:
 *             example:
 *               id: 1
 *               name: jarwo
 *               email: haqqi08@gmail.com
 *               role: admin
 *               createdAt: "2023-01-01T00:00:00.000Z"
 *               updatedAt: "2023-01-01T00:00:00.000Z"
 *       400:
 *         description: Bad Request. Check the request payload and try again.
 *       409:
 *         description: Conflict. The email is already registered.
 */
users.post("/v1/regis", loginRegisController.postRegis);

 /**
 * @swagger
 * /api/users/v1/login:
 *   post:
 *     tags: [User]
 *     summary: Log in with user credentials.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The user's email.
 *                 example: haqqi08@gmail.com
 *               password:
 *                 type: string
 *                 description: The user's password.
 *                 example: jarwokuat
 *     responses:
 *       200:
 *         description: User login successful.
 *         content:
 *           application/json:
 *             example:
 *               message: Anda berhasil login
 *               statusCode: 200
 *       400:
 *         description: Bad Request. Check the request payload and try again.
 *       401:
 *         description: Unauthorized. Email or password is incorrect.
 */
users.post("/v1/login", loginRegisController.userLogin);
/**
 * @swagger
 * /api/users/logout:
 *   get:
 *     tags: [User]
 *     summary: Log out the user.
 *     responses:
 *       200:
 *         description: Logout successful.
 */

users.get("/v1/cloudinary",loginRegisController.getOneUser)
users.post("/v1/cloudinary",uploader.single('file'), loginRegisController.uploadPhoto)
users.put("/v1/cloudinary", loginRegisController.savePhoto)





users.get("/logout", (req, res) => {
  // Clear the JWT token by setting an expired cookie
  res.cookie("access-token", "", { expires: new Date(0), httpOnly: true });
  res.status(200).json({ message: "Logout successful" });
});

module.exports = users;
