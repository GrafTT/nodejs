'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Users', [{
        firstName: 'Garret',
        lastName: 'Tomasson',
        email: 'gar@e.ry',
        createdAt: new Date(),
        updatedAt: new Date(),
    }], {})
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Users', null, {});
  }
};
