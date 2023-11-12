const { Wallet } = require("../models");

class WalletService {
  // add new wallet
  async addWallet(payload) {
    const { user_id, category, description } = payload;
    try {
      const newWallet = await Wallet.create({
        user_id,
        category,
        description,
      });
      return newWallet;
    } catch (error) {
      console.error("Failed to create new wallet:", error);
    }
  }
  // fetch data income - expanse per wallet per id
  async getWalletByUserId(userId) {
    const wallet = await Wallet.findAll({
      where: { user_id: userId },
      attributes: ["id", "category"],
    });
    return wallet;
  }
}

module.exports = WalletService;
