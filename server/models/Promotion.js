const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PromotionSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    house_id: {
        type: Schema.Types.ObjectId,
        ref: 'houses'
    },
    start_time: {
        type: Date,
    },
    end_time: {
        type: Date,
    },
    promotion_price: Number,
    trade_no: String,
    refund: {
        type: String,
        default: 'false' //false没退款，apply申请退款，true退款成功
    }
});


module.exports = Promotion = mongoose.model("promotions", PromotionSchema);