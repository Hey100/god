const mongoose = require('mongoose');
const Pool = require('../models/pool');
const ParticipantSchema = require('../models/participant');

exports.create = function(req, res, done) {
  console.log(req.user);
  debugger;
  const {
    title,
    description,
    category,
    participants,
    rate,
    amount,
    date,
    position
  } = req.body;
  const pool = new Pool({
    title,
    description,
    category,
    numOfParticipants: participants,
    participants: [{ user: req.user.id, position }],
    rate,
    amount,
    date,
    _user: req.user.id
  });
  pool.save(err => {
    if (err) {
      return done(err);
    }
    res.send(pool);
  });
};
