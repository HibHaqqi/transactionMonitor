const WalletService = require("../services/wallet.service")
const walletService = new WalletService;


class WalletController{
    async addWallet(req,res){
          try {
            const payload = req.body
            const newWallet = await walletService.addWallet(payload);
            res.status(201).json({ message: "User berhasil dibuat", data: newWallet });
          } catch (error) {
            res.status(400).json({
                status: "failed",
                message: error.message,
               
                });
          }  
    }
    async getWalletByUserId(req,res){

    }
}

module.exports = WalletController;