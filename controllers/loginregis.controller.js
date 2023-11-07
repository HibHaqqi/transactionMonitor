const LoginService = require("../services/login.service");
const RegisService = require("../services/regis.service");
//const loginService = new LoginService;
const regisService = new RegisService;

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
}

module.exports = LoginRegisController;