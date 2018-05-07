const mongoose = require('mongoose');
const { Schema } = mongoose;
const ParticipantSchema = require('./participant');

const poolSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  picture: String,
  numOfParticipants: { type: Number, required: true },
  participants: [ParticipantSchema],
  rate: { type: String, required: true },
  amount: { type: String, required: true },
  date: { type: Date, required: true },
  creator: { type: String, required: true },
  _user: { type: Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('pools', poolSchema);
