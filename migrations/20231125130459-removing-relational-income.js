'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.removeColumn('IncomeTransactions', 'income_id');
    await queryInterface.addColumn('IncomeTransactions', 'income_id', {
      type: Sequelize.STRING,
    });

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.addColumn('IncomeTransactions', 'income_id', {
      type: Sequelize.INTEGER,
    });
    await queryInterface.removeColumn('IncomeTransactions', 'income_id');

  }
};
