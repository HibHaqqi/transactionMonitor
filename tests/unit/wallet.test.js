const WalletService = require("../../services/wallet.service");
const { walletMock } = require("../mocks/dataMock");

const walletService = new WalletService;
const walletData = walletMock

describe("unit Testing - wallet.service.js",()=>{
    it("[+] create new wallet",async()=>{
        jest.setTimeout(10000);
        const walletNew = await walletService.addWallet(walletData);
        expect(walletNew.category).toBe(walletData.category);
        expect(walletNew.description).toBe(walletData.description);

        await walletService.delete(walletData.category)
    })
})