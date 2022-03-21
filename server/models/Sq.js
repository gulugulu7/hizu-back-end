const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SqSchema = new Schema({
    sq_name: String,
    sq_number: {
        type: String,
        unique: true
    },
    district_id: {
        type: Schema.Types.ObjectId,
        ref: 'districts'
    },
});

module.exports = Sq = mongoose.model("sqs", SqSchema);