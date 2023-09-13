const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Productschema = new Schema({
    name: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    images: [{
        type: String,
        required: true
    }],
    SKU: {
        type: String,
        required: true,
        unique: true
    },
    category_id: {
        type: String,
    },
    price_before: {
        type: Number,
        default: 0
    },
    price_after: {
        type: Number,
        default: 0
    },
    quantity: {
        type: Number
    }
}, { timeseries: true })


module.exports = mongoose.model.Product || mongoose.model("Product", Productschema);