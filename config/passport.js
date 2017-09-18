const passport = require('passport'),
      User = require('../models/users'),
      config = require('./main'),
      JwtStrategy = require('passport-jwt').Strategy,
      ExtractJwt = require('passport-jwt').ExtractJwt,
      LocalStrategy = require('passport-local');

const localOptions = { usernameField: 'email' };

const localLogin = new LocalStrategy(localOptions, function(email, password, done) {
  User.findOne({ email: email }, function(err, user) {
    if(err) { return done(err); }
    if(!user) { return done(null, false, { error: 'Your login details could not be verified. Please try again.' }); }

    user.comparePassword(password, function(err, isMatch) {
      if (err) { return done(err); }
      if (!isMatch) { return done(null, false, { error: "Your login details could not be verified. Please try again." }); }

      if(!user.emailVerified){
        return done(null, false, { error: "Your email is not verified. Please check your mail for verification instructions" });
      }
      return done(null, user);
    });
  });
});

const jwtOptions = {
  // Telling Passport to check authorization headers for JWT
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
  // Telling Passport where to find the secret
  secretOrKey: config.secret
};

const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
  console.log("skjhdfj" + payload);
  User.findById(payload._id, function(err, user) {
    if (err) { return done(err, false); }

    if (user) {
      console.log(user);
      done(null, user);
    } else {
      done(null, false);
    }
  });
});



passport.use(jwtLogin);
passport.use(localLogin);
