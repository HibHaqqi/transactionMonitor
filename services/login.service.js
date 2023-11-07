const bcrypt = require("bcrypt");
const { User } = require("../models");

class LoginService {
  async loginCheck(payload) {
    const { email, password } = payload;
    try {
      if (!email || !password) {
        throw new Error("data tidak lengkap");
      }
      const user = await User.findOne({ where: { email } });
      if (!user) {
        throw new Error("email tidak terdaftar");
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        throw new Error("password tidak sesuai");
      }
      return //token terbuat 
    } catch (error) {
        throw error;
    }
  }
  async isAuthenticated() {
    
  }
}

module.exports = LoginService;
