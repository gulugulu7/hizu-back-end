const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    message_header: String, //消息标题
    message_content: String, //消息内容
    sending_time: { //发送时间
        type: Date,
        default: Date.now
    },
    message_state: { //消息状态
        type: Boolean,
        default: true
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    message_jump: String,
    message_type: Number //1是系统消息，2是预约消息，3是审核消息
});

module.exports = Message = mongoose.model("messages", MessageSchema);