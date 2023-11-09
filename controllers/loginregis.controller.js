const LoginService = require("../services/login.service");
const RegisService = require("../services/regis.service");
const loginService = new LoginService;
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

    async userLogin(req,res){
        try {
            const payload = req.body;
            const token = await loginService.loginCheck(payload);
            res.json({token})
        } catch (error) {
            res.status(401).json({ error: error.message });
        }
    }

    async isAuthenticated(req,res,next){
        const token = req.headers.authorization; // Assuming the token is sent in the Authorization header

        try {
          const decoded = await loginService.authenticatedService(token);
          req.decoded = decoded; // If token is valid, save the decoded information in the request object
          next();
        } catch (error) {
          return res.status(401).json({ message: error.message });
    }}
}

module.exports = LoginRegisController;