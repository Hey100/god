const mongoose = require('mongoose')
const { Schema } = mongoose

const paymentSchema = new Schema({
	startDate: {type: Date, required: true},
	dDate: {type: Date, required: true},
	endDate: {type: Date, required: true},
	monthly: {type: String, required: true},
	disburseAmount: {type: String, required: true},
	title: {type: String, required: true},
	_pool: { type: Schema.Types.ObjectId, ref: 'Pool' },
	_user: { type: Schema.Types.ObjectId, ref: 'User' }
})

module.exports = mongoose.model('payments', paymentSchema);