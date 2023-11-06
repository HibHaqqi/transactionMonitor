'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ExpansesTransactions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onDelete: 'CASCADE', // untuk kasih konfig apabila data member dihapus maka data loan dihapus
        references: {
          model: "Users",
          key: 'id'
        }
      },
      wallet_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onDelete: 'CASCADE', // untuk kasih konfig apabila data member dihapus maka data loan dihapus
        references: {
          model: "Wallets",
          key: 'id'
        }
      },
      expanses_id: {
        type: Sequelize.INTEGER,
        allowNull : false,
        references :{
          model:"Expanses",
          key:'id'
        }

        
      },
      amount: {
        type: Sequelize.INTEGER
      },
      date_transaction: {
        type: Sequelize.DATE
      },
      description: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('ExpansesTransactions');
  }
};