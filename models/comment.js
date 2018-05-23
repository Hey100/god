const mongoose = require('mongoose')
const {Schema} = mongoose

const commentSchema = new Schema({
  comment: { type: String, required: true },
  creator: { type: String, required: true },
  creatorPic: { type: String, required: true },
  _pool: { type: Schema.Types.ObjectId, ref: 'Pool' },
  _user: { type: Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('comments', commentSchema)