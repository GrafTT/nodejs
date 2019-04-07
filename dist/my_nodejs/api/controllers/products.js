'use strict';

const util = require('util');
const Product = require('../models/schemas').Product;


module.exports = {
  getAllProducts,
  getProductById,
  addNewProduct,
  getProductByIdReviews,
  deleteProductById

};

function getAllProducts(req, res) {
  Product.find({}, function (err, products) {
    if (err) return console.log(err);
    res.send(products)
  });
}

function getProductById(req, res) {
  const id = req.params.id;
  Product.findOne({
    _id: id
  }, function (err, product) {
    if (err) return console.log(err);
    res.send(product);
  });
}

function addNewProduct(req, res) {
  const title = req.body.title;
  const price = req.body.price;
  const reviews = req.body.reviews;
  const product = new Product({
    title,
    price,
    reviews
  });
  product.save(function (err) {
    if (err) return console.log(err);
    Product.find({}, function (err, products) {

      if (err) return console.log(err);
      res.send(products)
    });
  });
}

function deleteProductById(req, res) {
  const id = req.params.id;
  Product.findByIdAndDelete(id, function (err, product) {

    if (err) return console.log(err);
    res.send(product);
  });
}

function getProductByIdReviews(req, res) {
  const id = req.params.id;
  Product.findOne({
    _id: id
  }, function (err, product) {
    if (err) return console.log(err);
    res.send(product.reviews);
  });
}