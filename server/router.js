const passport = require('passport');

const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport');

// middleware/interceptor between incoming request and route handler
// use the jwt strategy 
// because by default, passport tries to create a cookie based session
// set that to false
const requireAuth = passport.authenticate('jwt', { session: false });

module.exports = function(app) {
  app.get('/', requireAuth, function(req, res) { res.send({ hi: 'there' })});
  app.post('/signup', Authentication.signup);
}