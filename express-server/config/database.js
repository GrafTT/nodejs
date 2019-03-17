import Sequelize from 'sequelize';

module.exports = new Sequelize('nodejs_db', 'slava', '', {
  host: 'localhost',
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
})
