import express from "express";
import jwt from "jsonwebtoken";
import passport from "passport";
import checkToken from "../middlewares/checkToken";
import passportLocalAuth from "../middlewares/passport-local-auth";
import passportAuth from "../middlewares/passportAuth";
import {
  User,
  City,
  Product
} from '../models/schemas';
import addMock from '../helpers/addMockData';

const router = express.Router();

router.get("/", (req, res) => {
  addMock();
  res.cookie("my", "cookies");
  res.send("<h1>Logged!</h1>");
});

router.get("/api/products", checkToken, (req, res) => {
  Product.find({}, function (err, products) {
    if (err) return console.log(err);
    res.send(products)
  });
});

router.get("/api/products/:id", checkToken, (req, res) => {
  const id = req.params.id;
  Product.findOne({
    _id: id
  }, function (err, product) {
    if (err) return console.log(err);
    res.send(product);
  });
});

router.post("/api/products", checkToken, (req, res) => {
  const title = req.body.title;
  const price = req.body.price;
  const product = new Product({
    title,
    price
  });

  product.save(function (err) {
    if (err) return console.log(err);
    Product.find({}, function (err, products) {

      if (err) return console.log(err);
      res.send(products)
    });
  });
});

router.delete("/api/products/:id", checkToken, (req, res) => {
  const id = req.params.id;
  Product.findByIdAndDelete(id, function (err, product) {

    if (err) return console.log(err);
    res.send(product);
  });

});

router.get("/api/products/:id/reviews", checkToken, (req, res) => {
  const id = req.params.id;
  Product.findOne({
    _id: id
  }, function (err, product) {
    if (err) return console.log(err);
    res.send(product.reviews);
  });
});

router.get("/api/users", checkToken, (req, res) => {
  User.find({}, function (err, users) {
    if (err) return console.log(err);
    res.send(users)
  });
});

router.delete("/api/users/:id", checkToken, (req, res) => {
  const id = req.params.id;
  User.findByIdAndDelete(id, function (err, user) {
    if (err) return console.log(err);
    res.send(user);
  });
})

router.get("/api/cities", checkToken, (req, res) => {
  City.find({}, function (err, cities) {
    if (err) return console.log(err);
    res.send(cities)
  });
});

router.post("/api/cities", checkToken, (req, res) => {
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
});

router.delete("/api/cities/:id", checkToken, (req, res) => {
  const id = req.params.id;
  City.findByIdAndDelete(id, function (err, city) {
    if (err) return console.log(err);
    res.send(city);
  });
});

router.put("/api/cities/:id", checkToken, (req, res) => {
  const id = req.params.id;
  const name = req.body.title;
  const country = req.body.country;
  const capital = req.body.capital;
  City.findByIdAndUpdate(id, {
    capital,
    country,
    name
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
});

//AUTHENTICATE
router.post("/auth", (req, res, next) => {
  // passportLocalAuth(req, res, next);
  const name = req.body.name;
  const email = req.body.email;
  User.findOne({
    firstName: name,
    email: email
  }, function (err, user) {
    if (err) return console.log(err);
    if (user) {
      let token = jwt.sign({
          user
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
            email: user.email,
            username: user.name
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
  });

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

module.exports = router;