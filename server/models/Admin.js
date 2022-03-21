const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AdminSchema = new Schema({
    role: Number,
    name: String,
    password: String,
});

module.exports = Admin = mongoose.model("admins", AdminSchema);