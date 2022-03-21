const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReportSchema = new Schema({
    reason: {
        type: Number, //1房屋已出租，2价格虚假，3电话无法接通/号码错误，4房源不存在/地址虚假
    },
    remarks: {
        type: String
    },
    house_id: {
        type: Schema.Types.ObjectId,
        ref: 'houses'
    },
    handle: {
        type: Number,
        default: 1 //1待处理，2已处理，3不实举报
    },
});


module.exports = Report = mongoose.model("reports", ReportSchema);