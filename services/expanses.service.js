const { ExpansesTransaction } = require("../models");


class ExpansesService{
    // expanses add
    async addExpanses(payload){
        const {
            user_id,
            wallet_id,
            expanses_id,
            amount,
            date_transaction,
            description,
          } = payload;
        try {
            const addExpanses = await ExpansesTransaction.create({
                user_id,
                wallet_id,
                expanses_id,
                amount,
                date_transaction,
                description,
              });
              return addExpanses;
        } catch (error) {
            console.error('Failed to create transaction:', error);
        }
    }
    async editExpanses(payload){
        const {
            id,
            user_id,
            wallet_id,
            expanses_id,
            amount,
            date_transaction,
            description,
          } = payload;
        try {
            const expanseTrans = await ExpansesTransaction.update({
                user_id,
                wallet_id,
                expanses_id,
                amount,
                date_transaction,
                description,
              }, {
                where: { id: id}
              });
        
              if (expanseTrans[0] === 0) {
                
                throw new Error("Expanse Transaction Not found");
              }
                return expanseTrans;
                     
        } catch (error) {
          throw new Error("Data tidak lengkap");
        }
    }
}


// jumlah total pengeluaran per bulan
// jumlah total pengeluaran per category filter per bulan
// list pengeluaran terakhir 
// transactionByMonthCategory -- fetch data untuk stack chart catergory per month


// --------------------- support api untuk form-----------

// filter data by month & year transaction menu dropdown - getAvailableMonthsAndYears

module.exports = ExpansesService;