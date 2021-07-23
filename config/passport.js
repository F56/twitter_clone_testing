const passport = require("passport"),
  LocalStrategy = require("passport-local").Strategy,
  { User } = require("../models");

module.exports = (app) => {
  app.use(passport.initialize());
  app.use(passport.session());
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
      },
      async function (username, password, done) {
        User.findOne({ email: username }, (error, user) => {
          if (error) {
            console.log(error);
            return done(error);
          }
          if (!user) {
            return done(null, false, { message: 'Incorrect username.' });
          }
          if (!user.comparePassword(password)) {
            return done(null, false, { message: 'Incorrect password.' });
          }
          return done(null, user);
        });
      }
    )
  );
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
    const user = User.findById(id, function(err, user) {
      done(err, user);
    }).populate("Tweets");
  });
};
