const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CitySchema = new Schema({
    city_name: String,
    city_number: {
        type: String,
        unique: true
    }
});


module.exports = City = mongoose.model("citys", CitySchema);