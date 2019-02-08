import express from "express";
import cookieParser from "cookie-parser";


const app = express();
const router = express.Router();

app.use(cookieParser(), function(req, res, next) {
  req.parsedCookies = cookieParser.JSONCookies(req.cookies);
  next();
});
app.use(function(req, res, next) {
  req.parsedQuery = req.query;
  next();
});
app.get("/", (req, res) => {
  console.log(req.parsedCookies);
  console.log(req.parsedQuery);
  res.cookie("my", "cookies");
  res.send("<h1>Logged!</h1>");
});

router.get('/api/products', (req, res) => {
  console.log('All products')
  res.send("All products");
  next()
})
app.use('/api/products', router)

export default {
  listen(port, callback) {
    app.listen(port, callback);
  }
};
