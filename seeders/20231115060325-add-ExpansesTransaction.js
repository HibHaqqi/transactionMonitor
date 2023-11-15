"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("ExpansesTransactions", [
      {
        user_id: 1,
        wallet_id: 1,
        expanses_id: 1,
        amount: 10000,
        date_transaction: "01/06/2023",
        description: "Uji coba",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: 1,
        wallet_id: 1,
        expanses_id: 1,
        amount: 10000,
        date_transaction: "02/06/2023",
        description: "Uji coba",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: 1,
        wallet_id: 1,
        expanses_id: 1,
        amount: 10000,
        date_transaction: "03/06/2023",
        description: "Uji coba",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: 1,
        wallet_id: 1,
        expanses_id: 1,
        amount: 10000,
        date_transaction: "04/06/2023",
        description: "Uji coba",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: 1,
        wallet_id: 1,
        expanses_id: 1,
        amount: 10000,
        date_transaction: "05/06/2023",
        description: "Uji coba",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: 1,
        wallet_id: 1,
        expanses_id: 1,
        amount: 10000,
        date_transaction: "06/06/2023",
        description: "Uji coba",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: 1,
        wallet_id: 1,
        expanses_id: 2,
        amount: 10000,
        date_transaction: "05/06/2023",
        description: "Uji coba",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: 1,
        wallet_id: 1,
        expanses_id: 2,
        amount: 10000,
        date_transaction: "06/06/2023",
        description: "Uji coba",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: 1,
        wallet_id: 1,
        expanses_id: 3,
        amount: 10000,
        date_transaction: "07/06/2023",
        description: "Uji coba",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: 1,
        wallet_id: 1,
        expanses_id: 4,
        amount: 10000,
        date_transaction: "08/06/2023",
        description: "Uji coba",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
