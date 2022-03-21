const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SubwayLineSchema = new Schema({
    subwayLine_name: String,
    subwayLine_number: {
        type: String,
        unique: true
    },
    city_id: {
        type: Schema.Types.ObjectId,
        ref: 'citys'
    },
});

module.exports = SubwayLine = mongoose.model("subwaylines", SubwayLineSchema);