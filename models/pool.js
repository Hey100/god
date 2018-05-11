const mongoose = require('mongoose');
const { Schema } = mongoose;
const ContributorSchema = require('./contributor');

const poolSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  picture: String,
  numOfContributors: { type: Number, required: true },
  contributors: [ContributorSchema],
  rate: { type: String, required: true },
  amount: { type: String, required: true },
  startDate: { type: Date, required: true },
  creator: { type: String, required: true },
  _user: { type: Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('pools', poolSchema);
