const LoginService = require("../services/login.service");
const RegisService = require("../services/regis.service");
const loginService = new LoginService();
const regisService = new RegisService();

// JWT
const { createTokens } = require("../middleware/jwt");

class LoginRegisController {
    async postRegis(req, res) {
        try {
            const payload = req.body;
            console.log(payload);
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
            const token = await loginService.loginCheck(payload);
            const accessToken = createTokens(token);
            res.cookie("access-token", accessToken, {
                maxAge: 3600000 * 240,
            });
            res.status(200).json({
                message: "anda berhasil login",
                statusCode: 200,
                // role: token.role,
            });
        } catch (error) {
            res.status(401).json({ error: error.message });
        }
    }

    
}

module.exports = LoginRegisController;
