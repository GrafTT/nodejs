'use strict';

const util = require('util');
const User = require('../models/schemas').User;


module.exports = {
  getAllUsers,
  deleteUserById
};

function getAllUsers(req, res) {
  User.find({}, function (err, users) {
    if (err) return console.log(err);
    res.send(users)
  });
}

function deleteUserById(req, res) {
  const id = req.params.id;
  User.findByIdAndDelete(id, function (err, user) {

    if (err) return console.log(err);
    res.send(user);
  });
}