'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Expanses',
      [
        {
          category: "Food & Drink",
          description: "Food & Beverage",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          category: "Groceries",
          description: "ingredient,bathtool",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          category: "Housing",
          description: "perlengkapan rumah",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          category: "Medical",
          description: "obat-obatan",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          category: "Investing",
          description: "invest ke saham reksa",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          category: "Shopping",
          description: "Expanses to consumptif",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          category: "Education",
          description : "Expanses to Learning",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          category: "Gift & Donation",
          description: "Expanses to social",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          category: "Transport",
          description: "Expanses to Fuel & service",
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      ])
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
  }
};
