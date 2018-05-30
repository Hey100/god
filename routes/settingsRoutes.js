const mongoose = require('mongoose');

const User = mongoose.model('users');

module.exports = app => {
  app.post('/api/changeuserinfo', async (req, res, done) => {
    const { currentEmail, currentPassword, newEmail, newPassword } = req.body;
    console.log(req.body);

    User.findOne({ email: currentEmail }, function(err, user) {
      if (err) {
        return done(err);
      }
      if (user.googleId) {
        res.send({ user: 'google' });
      }
      user.comparePassword(currentPassword, function(err, isMatch) {
        if (err) {
          return done(err);
        }
        if (!isMatch) {
          return done(null, false);
        } else {
          if (newEmail !== currentEmail && newPassword) {
						checkForActiveUser(newEmail)
						console.log('running rest of function')
            // user.email = newEmail;
            // user.password = newPassword;
            // user.save(err => {
            //   if (err) return done(err);
            //   res.send(user);
            // });
          }
          if (newEmail !== currentEmail) {
            user.email = newEmail;
            user.save(err => {
              if (err) return done(err);
              res.send(user);
            });
          }
          if (newPassword) {
            user.password = newPassword;
            user.save(err => {
              if (err) {
                return done(err);
              }
              res.send(user);
            });
          } else {
            res.send(user);
          }
        }
      });
    });
  });
};

const checkForActiveUser = email => {
	console.log('checking for active user')
  User.findOne({ email: email }, function(err, activeUser) {
    if (err) return done(err);
    if (activeUser) {
      res.send({ activeUser: true });
    }
    return false;
  });
};
