const mongoose = require('mongoose')
const Schema = mongoose.Schema

const sliderSchema = new Schema({
    image: {
        type: String
    },
    category_id: {
        type: String,
    }
}, { timeseries: true })

const Slider = mongoose.model('slider', sliderSchema)
module.exports = Slider