const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

const userSchema = new Schema({
	googleId: String,
  first_name:  String, 
  last_name: String,
  dob: String,
  address1: String,
  address2: String,
  city: String,
  state:  String,
  zip:  Number,
  phone:  Number,
  savingsQ:  String,
  incomeQ:  String,
  email: { type: String, unique: true, lowercase: true },
	password: String,
	signUpComplete: Boolean,
	ccScore: { type: Number, default: 80 },
	mlimit: { type: Number, default: 700 },
	usedAmount: {type: Number, default: 0 }
});

userSchema.pre('save', function(next) {
	if (!this.isModified('password')) return next();
  const user = this;

  bcrypt.genSalt(10, function(err, salt) {
    if (err) {
      return next(err);
    }

    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) {
        return next(err);
      }

      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) {
      return callback(err);
    }

    callback(null, isMatch);
  });
};
module.exports = mongoose.model('user', userSchema);
