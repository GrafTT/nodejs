import express from "express";
import jwt from "jsonwebtoken";
import passport from "passport";
import checkToken from "../middlewares/checkToken";
import passportLocalAuth from "../middlewares/passport-local-auth";
import passportAuth from "../middlewares/passportAuth";

const router = express.Router();

router.get("/", (req, res) => {
  res.cookie("my", "cookies");
  res.send("<h1>Logged!</h1>");
});

router.get("/api/products", checkToken, (req, res) => {
  res.send("All products");
});

router.get("/api/products/:id", checkToken, (req, res) => {
  res.send(`Product with id: ${req.params.id}`);
});

router.get("/api/products/:id/reviews", checkToken, (req, res) => {
  res.send(`Product with id: ${req.params.id} reviews`);
});

router.get("/api/users", checkToken, (req, res) => {
  res.send(`Users`);
});

router.post("/auth", (req, res, next) => {
  // passportLocalAuth(req, res, next);
  const userMock = {
    id: 1,
    email: "ttt@ya.ru",
    name: "Slava",
    password: "123456"
  };
  if (
    userMock.name === req.body.name &&
    userMock.password === req.body.password
  ) {
    let token = jwt.sign({
        userMock
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
          email: userMock.email,
          username: userMock.name
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

router.post("/api/products", checkToken, (req, res) => {
  res.send(`All products with Added new product`);
});

module.exports = router;