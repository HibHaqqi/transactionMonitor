const LoginService = require("../services/login.service");
const RegisService = require("../services/regis.service");
//const loginService = new LoginService;
const regisService = new RegisService;

class LoginRegisController {
    async postRegis(req, res) {
        const payload = req.body;

        console.log(payload);

        const store = await regisService.regisNewUser(payload);

        res.status(201).json(store);
    }

}

module.exports = LoginRegisController;