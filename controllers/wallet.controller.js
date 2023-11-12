const WalletService = require("../services/wallet.service");
const walletService = new WalletService();

class WalletController {
  async addWallet(req, res) {
    try {
      const dataCookie = req.user;
      const user_id = dataCookie.id;
      const payload = { ...req.body, user_id };
      const newWallet = await walletService.addWallet(payload);
      res
        .status(201)
        .json({ message: "User berhasil dibuat", data: newWallet });
    } catch (error) {
      res.status(400).json({
        status: "failed",
        message: error.message,
      });
    }
  }
  async getWalletByUserId(req, res) {
    try {
      const dataCookie = req.user;
      const user_id = dataCookie.id;
      const getWalletByUserId = await walletService.getWalletByUserId(user_id);
      res.status(201).json({ status: "success", data: getWalletByUserId });
    } catch (error) {
      res.status(400).json({
        status: "failed",
        message: error.message,
        stack: error,
      });
    }
  }
}

module.exports = WalletController;
