const mongoose = require('mongoose')
const Comment = require('../models/comment')

exports.create = function(req, res, done) {
	const name = req.user.first_name + ' ' + req.user.last_name.charAt(0) + '.';
	const comment = new Comment ({
		comment: req.body.comment,
		pool_id: req.body.pool,
		creator: name
	})
	comment.save(err => {
		if (err) return done(err)
		res.send(comment)
	})
}