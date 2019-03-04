import passport from "passport";

export default (req, res, next) => {passport.authenticate('local', function(err, user) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.send('Invalid email or password!');
    }
    req.logIn(user, function(err) {
      if (err) {
        return next(err);
      }
      return res.redirect('/');
    });
  })(req, res, next)}