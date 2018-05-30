const mongoose = require('mongoose');

const User = mongoose.model('users');

module.exports = app => {
	app.post('/api/changeuserinfo', async (req, res, done) => {
		
		User.findOne({ email: req.body.currentEmail }, function (err, user) {
			if (err) {
				return done(err);
			}
			if (user.googleId) {
				res.send({user: 'google'})
			}
			user.comparePassword(req.body.currentPassword, function (err, isMatch) {
				if (err) {
					return done(err);
				}
				if (!isMatch) {
					return done(null, false);
				} else {
					if(req.body.newPassword) {
						user.password = req.body.newPassword
						user.save(err => {
							if (err) {
								return done(err)
							}
							res.send(user)
						})
					} else {
						res.send(user)
					}
				}
			});
		});
  });
};
