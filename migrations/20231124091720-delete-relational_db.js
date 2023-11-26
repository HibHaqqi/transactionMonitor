'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Hapus asosiasi dengan Expanses
    await queryInterface.removeColumn('ExpansesTransactions', 'expanses_id');
  },

  down: async (queryInterface, Sequelize) => {
    // Tambahkan kembali kolom expanses_id jika diperlukan
    await queryInterface.addColumn('ExpansesTransactions', 'expanses_id', {
      type: Sequelize.INTEGER,
    });
  }
};
