const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

const User = require('./../models/user');
const config = require('./../config');

//Create Local Strategy

// By default LocalStrategy will locate the password, but will be looking for username key 
// Therefore we must specify options for the 'usernameField' to be 'email' in our case
const localOptions = { usernameField: 'email' };
const localLogin = new LocalStrategy(localOptions, function(email, password, done) {
  // Verify username and password, if correct call done with the user
  // Otherwise call done with false
  
  
});

// Setup options for JWT Strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'), 
  secretOrKey: config.secret
};

// Create JWT Strategy
  // payload: sub, iat properties available from our signup response  via the tokenForUser function
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
  // see if the user ID  in the payload exists in our database
  // if it does call 'done' with that user
  // otherwise call 'done' without a user object
  User.findById(payload.sub, function(err, user) {
    // case where there is an error, for instance cannot reach the database
    if(err) return done(err, false);
    // we do locate the user
    if(user) {
      return done(null, user);
      // there is not an error, but we cannot locate the user in the database
    } else {
      return done(null, false);
    }
  })

});

// Tell Passport to use this strategy
passport.use(jwtLogin);