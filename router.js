const authentication = require('./controllers/authentication')
const passportServer = require('./services/passport')
const passport = require('passport')

const requireSignin = passport.authenticate('local', { session: true });

module.exports = function(app) {
	//get
	app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });
	app.get('/api/logout', (req, res) => {
		req.logout()
		res.send(req.user)
	})
	app.post('/api/login', requireSignin, authentication.signin)
	app.post('/api/signup', authentication.signup);
}