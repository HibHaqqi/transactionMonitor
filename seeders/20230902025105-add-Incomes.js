'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Incomes',
      [
        {
          name: "Salary",
          description: "Monthly Income",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Incentive",
          description: "Bonus & Incentive",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Other",
          description: "other revenue stream",
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

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
