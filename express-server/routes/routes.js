import express from "express";
import jwt from 'jsonwebtoken'

const router = express.Router();

router.get("/", (req, res) => {
  console.log(req.parsedCookies);
  console.log(req.parsedQuery);
  res.cookie("my", "cookies");
  res.send("<h1>Logged!</h1>");
});

router.get("/api/products", (req, res) => {
  console.log("All products");
  res.send("All products");
});

router.get("/api/products/:id", (req, res) => {
  console.log(`Product with id: ${req.params.id}`);
  res.send(`Product with id: ${req.params.id}`);
});

router.get("/api/products/:id/reviews", (req, res) => {
  console.log(`Product with id: ${req.params.id} reviews`);
  res.send(`Product with id: ${req.params.id} reviews`);
});

router.get("/api/users", (req, res) => {
  console.log(`Users`);
  res.send(`Users`);
});

router.post("/auth", (req, res) => {
  const userMock = {
    id: 1,
    email: 'ttt@ya.ru',
    name: 'Slava',
    password: '123456'
  }
  if (userMock.name === req.body.name && userMock.password === req.body.password) {
    let token = jwt.sign({
      userMock
    }, 'secret', {
      expiresIn: 100000
    });
    res.status(200).json({
      message: 'OK',
      data: {
        user: {
          email: userMock.email,
          username: userMock.name
        }
      },
      token
    })
  } else {
    res.status(404).json({
      message: "Not Found",
      data: "additional error response data"
    })
  }
});

router.post("/api/products", checkToken, (req, res) => {

  console.log(`Added new product`);
  res.send(`All products with Added new product`);
});

function checkToken(req, res, next) {
  let token = req.headers['x-access-token'];
  console.log(token)


  if (token) {
    jwt.verify(token, 'secret', (err, decoded) => {
      if (err) {
        console.log(err)
        res.json({success: false, msg: "Failed to auth token."})
      } else {

        next()
      }
    })
  } else {
    res.status(403).json({success: false, msg: "No token provided."})
  }
}

module.exports = router;