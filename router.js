const authentication = require('./controllers/authentication');
const pools = require('./controllers/pools');
const passportServer = require('./services/passport');
const passport = require('passport');
const mongoose = require('mongoose');

const Pool = mongoose.model('pools');

const requireSignin = passport.authenticate('local', { session: true });

module.exports = function(app) {
  //get
  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });
  app.get('/api/logout', (req, res) => {
    req.logout();
    res.send(req.user);
  });
  app.get('/api/mypools', async (req, res) => {
    const pools = await Pool.find({ _user: req.user.id });
    res.send(pools);
  });
  //post
  app.post('/api/createPool', pools.create);
  app.post('/api/login', requireSignin, authentication.signin);
  app.post('/api/signup', authentication.signup);
};
