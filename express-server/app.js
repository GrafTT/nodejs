import express from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import routes from "./routes/routes";

const app = express();

app.use(cookieParser(), function(req, res, next) {
  req.parsedCookies = cookieParser.JSONCookies(req.cookies);
  next();
});

app.use(function(req, res, next) {
  req.parsedQuery = req.query;
  next();
});

app.use(routes);

export default {
  listen(port, callback) {
    app.listen(port, callback);
  }
};
