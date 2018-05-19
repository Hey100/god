const passport = require('passport');
const jwt = require('jwt-simple');
const keys = require('../config/keys')

function tokenForUser(user) {
	const timestamp = new Date().getTime();
	return jwt.encode({ sub: user.id, iat: timestamp }, keys.JwtSecretKey);
}

module.exports = app => {
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );
  app.get('/auth/google/callback', passport.authenticate('google'), (req,res) => {
		const token = tokenForUser(req.user)
		const boo = req.user.signUpComplete ? true : false
		res.redirect(`/setToken/${token}/${boo}`)
	});
};
