const mongoose = require('mongoose')
const {Schema} = mongoose

const commentSchema = new Schema({
	comment: {type: String, required: true},
	pool_id: {type: String, required: true},
	creator: {type: String, required: true}
})

module.exports = mongoose.model('comments', commentSchema)