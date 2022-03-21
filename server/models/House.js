const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HouseSchema = new Schema({
    housing_type: String,
    rental_mode: String,
    community_name: String,
    sq_value: {
        type: Schema.Types.ObjectId,
        ref: 'sqs'
    },
    cell_address: String,
    room: Number,
    hall: Number,
    toilet: Number,
    floorage: Number,
    floor: Number,
    floor_all: Number,
    elevator: Boolean,
    house_orientation: String,
    subway_checked: Boolean,
    subway_station_value: {
        type: Schema.Types.ObjectId,
        ref: 'subwaystations',
    },
    price: Number,
    payment_method: String,
    rent_includes: Array,
    check_in_time: Date,
    number: Number,
    renovation: String,
    configuration_includes: Array,
    rental_requirements: String,
    housing_description: String,
    house_img: String,
    contacts: String,
    contactssex: String,
    contact_number: Number,
    create_time: {
        type: Date,
        default: Date.now
    },
    update_time: {
        type: Date,
        default: Date.now
    },
    house_number: String,
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    house_state: { //1表示显示中（正常），2表示审核中，3表示审核未通过，4表示已删除
        type: Number,
        default: 2
    },
    promotion: {
        type: String,
        default: 'false'
    }
});

module.exports = House = mongoose.model("houses", HouseSchema);