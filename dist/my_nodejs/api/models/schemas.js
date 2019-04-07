const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const citySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  capital: {
    type: Boolean,
    required: true
  },
  location: {
    lat: Number,
    long: Number,
  }
})

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: String,
  email: {
    type: String,
    required: true
  },
})

const productSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  price: Number,
  reviews: {
    type: Number,
    default: 0
  }
})

const User = mongoose.model('User', userSchema)
const City = mongoose.model('City', citySchema)
const Product = mongoose.model('Product', productSchema)

module.exports = {
  User,
  City,
  Product
};