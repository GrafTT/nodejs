import passport from "passport";
import keys from "./keys";

const FacebookStrategy = require("passport-facebook").Strategy;

passport.use(new FacebookStrategy({
    clientID: keys.facebook.clientID,
    clientSecret: keys.facebook.clientSecret,
    callbackURL: "/auth/facebook/redirect"
  },
  function (accessToken, refreshToken, profile, done) {
    return done(null, profile);
  }
));