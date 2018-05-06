const mongoose = require('mongoose');
const { Schema } = mongoose;

const participantSchema = new Schema({
	user: { type: String, required: true },
	position: { type: Number, required: true }
});

module.exports = participantSchema;