const passport = require('passport');
const passportServer = require('../services/passport');
const jwt = require('jwt-simple');
const keys = require('../config/keys');
const authentication = require('../controllers/authentication');
const requireSignin = passport.authenticate('local', { session: false });
const requireAuth = passport.authenticate('jwt', { session: false });

module.exports = app => {
  //get
  app.get('/api/current_user', requireAuth, (req, res) => {
    res.send(req.user);
  });
  app.get('/api/jwt', requireAuth, (req, res) => {
    res.send(req.user);
  });
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );
  app.get(
    '/auth/google/callback',
    passport.authenticate('google'),
    (req, res) => {
      !req.user.signUpComplete
        ? res.redirect('/oauthsignup')
        : res.redirect('/oauthsignin');
    }
  );
  app.get('/api/signin', authentication.oAuthSignIn);
  app.get('/api/logout', (req, res) => {
    req.logout();
    res.send(req.user);
  });

  //post
  app.post('/api/signin', requireSignin, authentication.signin);
  app.post('/api/signup', authentication.signup);
  app.post('/api/oauthsignup', authentication.oAuthSignUp);
  app.post('/api/updateUser', requireAuth, authentication.update);
};
