const { User } = require("../models");

class RegisService {
  async regisNewUser(payload) {
    try {
      //menerima data dari body request
      const { name, email, password, role } = payload;
      let error = [];
      //validasi data
      if (!name || !email || !password || !role) {
        req.flash("error", "Data tidak lengkap");

        return res.redirect("/");
        //return res.status(400).json({ message: "" });
        //error.push({ message: "Data tidak lengkap" });
      }

      //cek apakah email sudah terdaftar
      const user = await User.findOne({ where: { email } });
      if (user) {
        req.flash("error", "Email sudah terdaftar");

        return res.redirect("/");
        //return res.status(409).json({ message: "" });
        //error.push({ message: "Email sudah terdaftar" });
      }

      //hash password menggunakan bcrypt

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      //buat user baru di database
      const newUser = await User.create({
        name,
        email,
        password: hashedPassword,
        role,
      });
      req.user = user;
      next();

      //res.redirect("/dashboard"); // successful regis
      //res.status(201).json({ message: "User berhasil dibuat", data: newUser });
    } catch (error) {
      //tangani error
      console.error(error);
      res.status(500).json({ message: "Terjadi kesalahan" });
    }
  }
}
module.exports = RegisService;