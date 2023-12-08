const bcrypt = require("bcrypt");
const { User } = require("../models");

class RegisService {

  async regisNewUser(payload) {
    const { name, email, password, role } = payload;
    try {
      if (!name || !email || !password || !role) {
        throw new Error("Data tidak lengkap");
      }

      const user = await User.findOne({ where: { email } });
      if (user) {
        throw new Error("Email sudah terdaftar");
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = await User.create({
        name,
        email,
        password: hashedPassword,
        role,
      });

      return newUser;
    } catch (error) {
      throw error;
    }
  }
  //delete unit test email
  async delete(email) {
    await this.User.destroy({
      where: {
        email: email,
      },
    });
  }
}

module.exports = RegisService;
