import express from "express";

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

router.post("/api/products", (req, res) => {
  console.log(`Added new product`);
  res.send(`All products with Added new product`);
});

module.exports = router;
