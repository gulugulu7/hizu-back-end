const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SubwayStationSchema = new Schema({
    subwayStation_name: String,
    subwayStation_number: {
        type: String,
        unique: true
    },
    subwayLine_id: {
        type: Schema.Types.ObjectId,
        ref: 'subwaylines'
    },
});

module.exports = SubwayStation = mongoose.model("subwaystations", SubwayStationSchema);