import passport from "passport";
import LocalStrategy from "passport-local";

const userLocal = {
  id: 2,
  email: "test@gmail.com",
  password: "123456"
};

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  const user = userLocal.id === id ? userLocal : false;
  done(null, user)
});

passport.use(
  new LocalStrategy({
    usernameField: "email"
  }, function (
    email,
    password,
    done
  ) {
    if (email === userLocal.email && password === userLocal.password) {
      return done(null, userLocal);
    } else {
      return done(null, false);
    }
  })
);