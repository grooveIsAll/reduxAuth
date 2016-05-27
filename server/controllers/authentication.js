const jwt = require('jwt-simple');

const User = require('./../models/user');
const config = require('./../config');

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  // jtw: convention to use the 'sub' property of the token which is short for subject (who)
  // iat: issued at time
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

exports.signup = function(req, res, next) {
  const email = req.body.email;
  const password = req.body.password;

  if(!email || !password) {
    res.status(422)
      .send({ error: 'Must provide both email and password' });
  }

  // Check whether a user with the given email exists
  User.findOne({ email: email }, function(err, existingUser) {
    if(err) return next(err);
    // If a user with that email already exists, return an error
    if(existingUser){
      // 422: unprocessable entity, 
      return res.status(422)
        .send({ error: 'Email is in use' });
    }
    // If user/email does not exist, create and save the record
    const user = new User({
      email: email,
      password: password
    });

    user.save(function(err) {
      if(err) return next(err);
    });
    // Respond to the request indicating that the user was created
    res.json({ 
      token: tokenForUser(user) 
    });
  });
}