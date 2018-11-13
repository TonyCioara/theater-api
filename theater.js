const mongoose = require('mongoose');
const Schema = mongoose.Schema; 

const SessionSchema = new Schema({
  name: {type: String, required: true},
  description: {type: String, required: true},
  seatsAvailable: {type: Number, default: 0},
  seats: {type: [[Number]], require: true}
});

module.exports = mongoose.model('Session', SessionSchema);