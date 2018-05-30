const User = require('../models/user');
const jwt = require('jwt-simple');
const keys = require('../config/keys');
const _ = require('lodash');

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, keys.JwtSecretKey);
}

exports.signin = function(req, res, next) {
  res.send({ token: tokenForUser(req.user) });
};

exports.signup = function(req, res, next) {
	const email = req.body.email;
  const password = req.body.password;
  const phone = req.body.phone.replace(/[^a-zA-Z0-9 ]/g, '');
  const first_name = _.capitalize(req.body.first_name);
  const last_name = _.capitalize(req.body.last_name);
	
  if (!email || !password) {
		return res
		.status(422)
		.send({ error: 'You must provide an email and password' });
  }
	
  User.findOne({ email: email }, function(err, existingUser) {
		if (err) {
			return next(err);
		}
		
		if (existingUser && existingUser.googleId) {
			return res.status(422).send({ error: 'Email is associated with a Google account. Please try logging in with Google.' });
    }
    if (existingUser) {
			return res.status(422).send({ error: 'Email is already in use' });
    }
    const user = new User({
			first_name,
      last_name,
			dob: req.body.dob,
			profilePic: req.body.pic,
      address1: req.body.address1,
      address2: req.body.address2,
      city: req.body.city,
      state: req.body.state,
      zip: req.body.zip,
      phone,
      savingsQ: req.body.savingsQ,
      incomeQ: req.body.incomeQ,
      email: email,
      password: password,
      signUpComplete: true
    });
		
    user.save(err => {
			if (err) {
				return next(err);
      }
      res.send({ token: tokenForUser(user) });
    });
  });
};

exports.oAuthSignIn = function(req, res, next) {
  res.send({ token: tokenForUser(req.user) });
};

exports.oAuthSignUp = function(req, res, next) {
	const phone = req.body.phone.replace(/[^a-zA-Z0-9 ]/g, '');
  const first_name = _.capitalize(req.body.first_name);
  const last_name = _.capitalize(req.body.last_name);
  req.user.first_name = first_name;
  req.user.last_name = last_name;
  req.user.dob = req.body.dob;
  req.user.address1 = req.body.address1;
  req.user.address2 = req.body.address2;
  req.user.city = req.body.city;
  req.user.state = req.body.state;
  req.user.zip = req.body.zip;
  req.user.phone = phone;
  req.user.savingsQ = req.body.savingsQ;
  req.user.incomeQ = req.body.incomeQ;
  req.user.signUpComplete = true;

  req.user.save(err => {
    if (err) return next(err);
    res.send({ token: tokenForUser(req.user) });
  });
};

exports.update = async (req, res, done) => {
  const monthly = parseInt(req.body.monthly);

  if (monthly + req.user.usedAmount <= req.user.mlimit) {
    req.user.usedAmount += monthly;
    const user = await req.user.save();
    res.send(user);
  } else {
    return res
      .status(422)
      .send({ error: 'Participating in this pool exceeds your monthly limit' });
  }
};
