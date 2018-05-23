const mongoose = require('mongoose')
const Comment = require('../models/comment')

exports.create = function(req, res, done) {
	const name = req.user.first_name + ' ' + req.user.last_name.charAt(0) + '.';
	const comment = new Comment ({
		comment: req.body.comment,
		creator: name,
		creatorPic: req.body.pic,
		_pool: req.body.poolId,
		_user: req.user.id
	})
	comment.save(err => {
		if (err) return done(err)
		res.send(comment)
	})
}