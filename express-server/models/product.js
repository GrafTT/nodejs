'use strict';
// module.exports = (sequelize, DataTypes) => {
//   const Product = sequelize.define('Product', {
//     title: DataTypes.STRING,
//     price: DataTypes.INTEGER,
//     count: DataTypes.INTEGER
//   }, {});
//   Product.associate = function(models) {
//     // associations can be defined here
//   };
//   return Product;
// };
const Sequelize = require('sequelize');
const db = require('../config/database');

const Product = db.define('Product', {
  title: Sequelize.STRING,
  price: Sequelize.INTEGER,
  revies: Sequelize.INTEGER
})

module.exports = Product