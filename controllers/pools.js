const mongoose = require('mongoose');
const Pool = require('../models/pool');

exports.create = function(req, res, done) {
  const { title, description, category, participants, rate, amount } = req.body;
  const pool = new Pool({
    title,
    description,
    category,
    numOfParticipants: participants,
    rate,
    amount,
    _user: req.user.id
  });
  pool.save(err => {
    if (err) {
      return done(err);
    }
    res.send(pool);
  });
};
