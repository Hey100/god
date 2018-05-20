const mongoose = require('mongoose');
const passport = require('passport');
const comments = require('../controllers/comments');
const requireAuth = passport.authenticate('jwt', { session: false });

const Comment = mongoose.model('comments');

module.exports = app => {
	//get
	app.get('/api/comments/:id', async (req, res) => {
		const comments = await Comment.find({ _pool: req.params.id });
		res.send(comments);
	});

	//post
	app.post('/api/saveComment', requireAuth, comments.create);
}