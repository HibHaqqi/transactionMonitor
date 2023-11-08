const bcrypt = require("bcrypt");
const { User } = require("../models");
const jwt = require("jsonwebtoken");
const secretKey = "yourSecretKey";

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
      const token = jwt.sign(
        { email: user.email, userId: user.id },
        secretKey,
        { expiresIn: "1h" }
      );

      return token;
    } catch (error) {
      throw error;
    }
  }
  async authenticatedService(token) {
    if (!token) {
      throw new Error("No token provided");
    }

    try {
      const decoded = await new Promise((resolve, reject) => {
        jwt.verify(token, secretKey, (err, decoded) => {
          if (err) {
            reject(err);
          } else {
            resolve(decoded);
          }
        });
      });
      return decoded;
    } catch (error) {
      throw new Error("Failed to authenticate token");
    }
  }
}

module.exports = LoginService;
