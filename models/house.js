const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HouseSchema = new Schema({
    owner : String,
    price : Number,
    description : String,
    city : String,
    locality : String,
    phoneNumber : Number
});

module.exports = mongoose.model('House' , HouseSchema);