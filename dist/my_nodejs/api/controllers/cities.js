'use strict';

const util = require('util');
const City = require('../models/schemas').City;


module.exports = {
  getAllCities,
  addNewCity,
  updateCityById,
  deleteCitytById

};

function getAllCities(req, res) {
  City.find({}, function (err, cities) {
    if (err) return console.log(err);
    res.send(cities)
  });
}

function updateCityById(req, res) {
  const id = req.swagger.params.id;
  const name = req.body.title;
  const country = req.body.country;
  const capital = req.body.capital;
  const location = req.body.location;
  City.findByIdAndUpdate(id, {
    capital,
    country,
    name,
    location
  }, {
    new: true
  }, function (err, city) {
    if (err) return console.log(err);
    if (city) {
      res.send(city)
    } else {
      const city = new City({
        name,
        country,
        capital
      });

      city.save(function (err) {
        if (err) return console.log(err);
        City.find({}, function (err, cities) {

          if (err) return console.log(err);
          res.send(cities)
        });
      });
    }
  });
}

function addNewCity(req, res) {
  const name = req.body.title;
  const country = req.body.country;
  const capital = req.body.capital;
  const location = req.body.location;
  const city = new City({
    name,
    country,
    capital,
    location
  });

  city.save(function (err) {
    if (err) return console.log(err);
    City.find({}, function (err, cities) {

      if (err) return console.log(err);
      res.send(cities)
    });
  });
}

function deleteProductById(req, res) {
  const id = req.params.id;
  City.findByIdAndDelete(id, function (err, city) {
    if (err) return console.log(err);
    res.send(city);
  });
}