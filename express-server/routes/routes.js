import express from "express";
import jwt from "jsonwebtoken";
import passport from "passport";
import checkToken from "../middlewares/checkToken";
import passportLocalAuth from "../middlewares/passport-local-auth";
import passportAuth from "../middlewares/passportAuth";

const db = require('../config/database');
const User = require('../models/user');
const Product = require('../models/product');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const router = express.Router();

router.get("/", (req, res) => {
  res.cookie("my", "cookies");
  res.send("<h1>Logged!</h1>");
});

router.get("/api/products", checkToken, (req, res) => {
  Product.findAll()
    .then(products => res.send(products))
    .catch(err => console.log(err));

});

router.get("/api/products/:id", checkToken, (req, res) => {
  Product.findOne({
      where: {
        id: req.params.id
      }
    })
    .then(product => res.send(product))
    .catch(err => console.log(err));
});

router.get("/api/products/:id/reviews", checkToken, (req, res) => {
  Product.findOne({
      where: {
        id: req.params.id
      }
    })
    .then(product => res.send(product.revies))
    .catch(err => console.log(err));
});

router.get("/api/users", checkToken, (req, res) => {
  User.findAll()
    .then(users => res.send(users))
    .catch(err => console.log(err));
});

router.post("/auth", (req, res, next) => {
  // passportLocalAuth(req, res, next);
  User.findOne({
      where: {
        email: req.body.email
      }
    })
    .then(user => {
      if (user) {
        let token = jwt.sign({
            user: user.email
          },
          "secret", {
            expiresIn: 100000
          }
        );
        res.header('x-access-token', token);
        res.status(200).json({
          message: "OK",
          data: {
            user: {
              email: user.email
            }
          },
          token
        });
      } else {
        res.status(404).json({
          message: "Not Found",
          data: "additional error response data"
        });
      }
    })
    .catch(err => console.log(err));
});

router.get('/auth/google', passport.authenticate('google', {
  scope: ['profile']
}))

router.get('/auth/google/redirect', passport.authenticate('google', {
  failureRedirect: '/auth'
}), (req, res) => {
  // Successful authentication, redirect home.
  res.redirect('/');
})

router.get('/auth/facebook', passport.authenticate('facebook'))

router.get('/auth/facebook/redirect', passport.authenticate('facebook', {
  failureRedirect: '/auth'
}), (req, res) => {
  // Successful authentication, redirect home.
  res.redirect('/');
})

router.get('/auth/twitter',
  passport.authenticate('twitter'));

router.get('/auth/twitter/redirect',
  passport.authenticate('twitter', {
    failureRedirect: '/auth'
  }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

router.post("/api/products", (req, res) => {
  let {
    title,
    price
  } = req.body;
  let errors = [];

  // Validate Fields
  if (!title) {
    errors.push({
      text: 'Please add a title'
    });
  }
  if (!price) {
    errors.push({
      text: 'Please add some price'
    });
  }

  // Check for errors
  if (errors.length > 0) {
    res.send('Please, fill the next fields: ', {
      errors,
    });
  }

  // Make lowercase and remove space after comma
  title = title.toLowerCase().replace(/, /g, ',');

  // Insert into table
  Product.create({
      title,
      price,
      revies: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    .then(data => Product.findAll().then(products => res.send(products)).catch(err => console.log(err)))
    .catch(err => console.log(err));
});

module.exports = router;