const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: String,
    password: String,
    email: String,
    phone: String,
    avatar: {
        type: String,
        default: 'http://localhost:3006/uploads/avatar/default/user.png'
    },
    create_time: {
        type: Date,
        default: Date.now
    },
    login_time: {
        type: Date,
        default: Date.now
    },
    password_grade: Number
});

module.exports = User = mongoose.model("users", UserSchema);