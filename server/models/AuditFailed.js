const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AuditFailedSchema = new Schema({
    house_id: {
        type: Schema.Types.ObjectId,
        ref: 'houses'
    },
    reason: {
        type: String
    },
});

module.exports = AuditFailed = mongoose.model("auditfaileds", AuditFailedSchema);