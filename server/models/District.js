const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DistrictSchema = new Schema({
    district_name: String,
    district_number: {
        type: String,
        unique: true
    },
    city_id: {
        type: Schema.Types.ObjectId,
        ref: 'citys'
    },
});

module.exports = District = mongoose.model("districts", DistrictSchema);