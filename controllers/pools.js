const mongoose = require('mongoose');
const Pool = require('../models/pool');
const ContributorSchema = require('../models/contributor');

exports.create = function(req, res, done) {
  const {
    title,
    description,
    category,
    contributors,
    rate,
    amount,
    startDate,
		position,
		poolPic
	} = req.body;
	const creator = req.user.first_name + " " + req.user.last_name.charAt(0) + "."
  const pool = new Pool({
    title,
    description,
    category,
    numOfContributors: contributors,
		contributors: [{ user: req.user.id, position, name:creator }],
    rate,
    amount,
		startDate,
		creator,
		poolPic,
    _user: req.user.id
  });
  pool.save(err => {
    if (err) {
      return done(err);
    }
    res.send(pool);
  });
};

exports.join = function(req, res, done) {
	Pool.findById(req.body.poolId, function(err, pool) {
		if(err) return done(err)
		const name = req.user.first_name+" "+ req.user.last_name.charAt(0)+"."
		pool.contributors.push({ user: req.user.id, name, position: req.body.position })
		pool.save(err => {
			if(err) return done(err)
			res.send(pool)
		})
	})
}
