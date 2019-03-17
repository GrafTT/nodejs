import express from "express";
import passport from "passport";
import session from "express-session";
import cookieParser from "cookie-parser";
import routes from "./routes/routes";
import './config/passport-local-strategy';
import './config/passport-google';
import './config/passport-facebook';
import './config/passport-twitter';
import db from './config/database';

const FileStore = require('session-file-store')(session);

const app = express();

db
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

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
    app.listen(port, callback);
  }
};