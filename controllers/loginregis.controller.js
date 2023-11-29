const LoginService = require("../services/login.service");
const RegisService = require("../services/regis.service");
const PhotoController = require("../services/photo.service");
const UserController = require("../services/user.service");
const loginService = new LoginService();
const regisService = new RegisService();
const photoService = new PhotoController();
const userService = new UserController();

// JWT
const { createTokens } = require("../middleware/jwt");

// Cloudinary
const uploadCloudinary = require("../libs/upload-cloudinary");
const UserService = require("../services/user.service");

class LoginRegisController {
    async postRegis(req, res) {
        try {
            const payload = req.body;
            const newUser = await regisService.regisNewUser(payload);
            res.status(201).json({ message: "User berhasil dibuat", data: newUser });
        } catch (error) {
            if (error.message === "Data tidak lengkap") {
                res.status(400).json({ message: "Data tidak lengkap" });
            } else if (error.message === "Email sudah terdaftar") {
                res.status(409).json({ message: "Email sudah terdaftar" });
            } else {
                res.status(500).json({ message: "Terjadi kesalahan" });
            }
        }
    }

    async userLogin(req, res) {
        try {
            const payload = req.body;
            const response = await loginService.loginCheck(payload);
            const token = createTokens(response.dataValues);
            // res.cookie("access-token", accessToken, {
            //     maxAge: 3600000 * 240,
            // });
            res.status(200).json({
                message: "anda berhasil login",
                statusCode: 200,
                token,
                data: response,
                // role: token.role,
            });
        } catch (error) {
            res.status(401).json({ error: error.message });
        }
    }

    async getOneUser(req, res) {
        const payload = req.query;
        console.log(payload);
        try {
            const user = await userService.getOne(payload);
            res.status(200).json({
                data: user,
            });
        } catch (error) {
            res.status(400).json({
                message: error.message,
            });
        }
    }

    async uploadPhoto(req, res) {
        try {
            const { url } = await uploadCloudinary(req.file.path);
            if (url) {
                res.status(200).json({
                    message: "upload berhasil!",
                    url: url,
                });
            } else {
                res.status(400).json({
                    message: "upload gagal!",
                    url: null,
                });
            }
        } catch (error) {
            res.status(400).json({
                message: error.message,
            });
        }
    }

    async savePhoto(req, res) {
        const payload = req.body;
        console.log(payload);
        try {
            const savePhoto = await photoService.savePhoto(payload);
            res.status(200).json({
                message: "success",
                data: payload.user_image,
            });
        } catch (error) {
            res.status(400).json({
                message: error.message,
            });
        }
    }
}

module.exports = LoginRegisController;
