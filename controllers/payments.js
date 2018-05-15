const mongoose = require('mongoose');
const Payment = require('../models/payment');

exports.create = function(req, res, done) {
  const {
    title,
    startDate,
    dDate,
    endDate,
    monthly,
    disburseAmount,
    poolId
  } = req.body;
  const payment = new Payment({
    startDate,
    dDate,
    endDate,
    monthly,
    disburseAmount,
    title,
    _pool: poolId,
    _user: req.user.id
  });
  payment.save(err => {
    if (err) return done(err);
    res.send(payment);
  });
};

exports.calculate = async (req, res, done) => {
  console.log(req.body, 'yay');
	Payment.findByIdAndUpdate(
		req.body.id,
		{ $set: { expired: true } },
		{ new: true },
		async (err, payment) => {
			if (err) return done(err);
		}
	);
try {
		req.user.usedAmount -= req.body.monthly;
		const user = await req.user.save();
		console.log(user)
		res.send(user);
  } catch (error) {
    res.status(422);
  }
};
