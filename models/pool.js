const mongoose = require('mongoose');
const { Schema } = mongoose;

const poolSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  picture: String,
  numOfParticipants: { type: Number, required: true },
  rate: { type: String, required: true },
	amount: { type: String, required: true },
	_user: { type: Schema.Types.ObjectId, ref: 'User'},
});

const ModelClass = mongoose.model('pools', poolSchema);

module.exports = ModelClass;
