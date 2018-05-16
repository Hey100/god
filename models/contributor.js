const mongoose = require('mongoose');
const { Schema } = mongoose;

const contributorSchema = new Schema({
	_user: { type: Schema.Types.ObjectId, ref: 'User' },
	name: {type: String, required: true},
	position: { type: Number, required: true }
});

module.exports = contributorSchema;