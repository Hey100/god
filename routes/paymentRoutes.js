const mongoose = require('mongoose');
const passport = require('passport');
const payments = require('../controllers/payments');
const requireAuth = passport.authenticate('jwt', { session: false });

const Payment = mongoose.model('payments');

module.exports = app => {
	//get	
	app.get('/api/payments', requireAuth, async (req, res) => {
    const payments = await Payment.find({ _user: req.user.id });
    res.send(payments);
  });

  //post
	app.post('/api/createPayment', requireAuth, payments.create);
	app.post('/api/calculateLimit', requireAuth, payments.calculate);
};
