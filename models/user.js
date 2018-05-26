const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

const pics = [
  'https://firebasestorage.googleapis.com/v0/b/friend-ec2f8.appspot.com/o/DRAGON.png?alt=media&token=903c5ad7-3bf3-4476-bf88-629703662ba3',
  'https://firebasestorage.googleapis.com/v0/b/friend-ec2f8.appspot.com/o/GODZ.png?alt=media&token=97543b34-bbb2-4662-9db2-90cd1badf35a',
  'https://firebasestorage.googleapis.com/v0/b/friend-ec2f8.appspot.com/o/MONKEY.png?alt=media&token=40b032fa-0405-4f20-a689-bd9a9966acd1',
  'https://firebasestorage.googleapis.com/v0/b/friend-ec2f8.appspot.com/o/MONSTER.png?alt=media&token=0ac84ade-e765-450b-b360-5673ea4fac70',
  'https://firebasestorage.googleapis.com/v0/b/friend-ec2f8.appspot.com/o/PUMP.png?alt=media&token=6929f688-1838-4998-bb1d-cb0b736dc246',
  'https://firebasestorage.googleapis.com/v0/b/friend-ec2f8.appspot.com/o/ROBOT.png?alt=media&token=90390298-3ac0-44bf-b1a9-3f08277e6547'
];
const selected = pics[Math.floor(Math.random() * 6)];

const userSchema = new Schema(
  {
    googleId: String,
    first_name: String,
    last_name: String,
    profilePic: { type: String, default: selected },
    dob: String,
    address1: String,
    address2: String,
    city: String,
    state: String,
    zip: Number,
    phone: Number,
    savingsQ: String,
    incomeQ: String,
    email: { type: String, unique: true, lowercase: true },
    password: String,
    signUpComplete: Boolean,
    ccScore: { type: Number, default: 80 },
    mlimit: { type: Number, default: 700 },
    usedAmount: { type: Number, default: 0 }
  },
  { timestamps: true }
);

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
module.exports = mongoose.model('users', userSchema);
