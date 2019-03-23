'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Products', [{
        title: 'Carrot',
        price: 55,
        revies: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
    }], {})
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Products', null, {});
  }
};
