const passport = require('passport');
const jwt = require('jwt-simple');
const keys = require('../config/keys')
const authentication = require('../controllers/authentication')

module.exports = app => {
	//get
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );
  app.get('/auth/google/callback', passport.authenticate('google'), (req,res) => {
		!req.user.signUpComplete ? res.redirect('/oauthsignup') : res.redirect('/oauthsignin');
	});
	app.get('/api/signin', authentication.oAuthSignIn);

	//post
	app.post('/api/oauthsignup', authentication.oAuthSignUp)
};
