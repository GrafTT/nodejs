import express from "express";
import passport from "passport";
import mongoose from "mongoose";
import session from "express-session";
import cookieParser from "cookie-parser";
import routes from "./routes/routes";
import './config/passport-local-strategy';
import './config/passport-google';
import './config/passport-facebook';
import './config/passport-twitter';

const FileStore = require('session-file-store')(session);

const app = express();

app.use(express.json());

app.use(
  session({
    secret: 'secret',
    store: new FileStore(),
    cookie: {
      path: '/',
      httpOnly: true,
      maxAge: 60 * 60 * 1000,
    },
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(cookieParser(), function (req, res, next) {
  req.parsedCookies = cookieParser.JSONCookies(req.cookies);
  next();
});

app.use(function (req, res, next) {
  req.parsedQuery = req.query;
  next();
});

app.use(routes);

export default {
  listen(port, callback) {
    mongoose.connect("mongodb://localhost:27017/myproject", {
      useNewUrlParser: true
    }, function (err) {
      if (err) return console.log(err);
      app.listen(port, callback);
    });
  }
};