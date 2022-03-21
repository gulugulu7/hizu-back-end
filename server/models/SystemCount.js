const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SystemCountSchema = new Schema({
    date: {
        type: String
    },
    number: {
        type: Number
    },
    classification: {
        type: String
    }
});

module.exports = SystemCount = mongoose.model("systemcounts", SystemCountSchema);