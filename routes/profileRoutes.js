const mongoose = require('mongoose')

const User = mongoose.model('users')

module.exports = app => {
	app.get('/api/fetchprofile/:id', async (req, res, done) => {
		const user = await User.findById({ _id: req.params.id });
		res.send(user);
	});
}