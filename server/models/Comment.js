const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    appointment_id: {
        type: Schema.Types.ObjectId,
        ref: 'appointments'
    },
    arrive: {
        type: Boolean,
    },
    appointment_score: Number,
    true_reason: String,
    defaulter: String,
    false_reason: String
});

module.exports = Comment = mongoose.model("comments", CommentSchema)