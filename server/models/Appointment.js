const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AppointmentSchema = new Schema({
    house_id: {
        type: Schema.Types.ObjectId,
        ref: 'houses'
    },
    house_owner_id: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    appointment_user_id: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    house_owner_confirm: {
        type: Boolean,
        default: false
    },
    appointment_user_confirm: {
        type: Boolean,
        default: true
    },
    appointment_date: Date,
    appointment_time: String,
    appointment_phone: String,
    appointment_place: {
        type: String,
        default: '房东同意后会给予地址'
    },
    comment: {
        type: Boolean,
        default: false
    }
});



module.exports = Appointment = mongoose.model("appointments", AppointmentSchema)