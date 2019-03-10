import passport from "passport";
import keys from "./keys";

const TwitterStrategy = require("passport-twitter").Strategy;

passport.use(new TwitterStrategy({
    consumerKey: keys.twitter.clientID,
    consumerSecret: keys.twitter.clientSecret,
    callbackURL: "/auth/twitter/redirect"
  },
  function (token, tokenSecret, profile, done) {
    return done(null, profile)
  }
));