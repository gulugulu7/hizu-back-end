const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CounterSchema = new Schema({
    counter_name: String,
    counter_number: Number,
});

module.exports = Counter = mongoose.model("counters", CounterSchema);