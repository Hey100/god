const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

const userSchema = new Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  dob: { type: String, required: true },
  address1: { type: String, required: true },
  address2: { type: String },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zip: { type: Number, required: true },
  phone: { type: Number, required: true },
  savingsQ: { type: String, required: true },
  incomeQ: { type: String, required: true },
  email: { type: String, unique: true, lowercase: true, require: true },
  password: { type: String, required: true },
	ccScore: { type: Number, required: true, default: 80 },
	mlimit: { type: Number, required: true, default: 700 },
	usedAmount: {type: Number, required: true, default: 0 }
});

userSchema.pre('save', function(next) {
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
