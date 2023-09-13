const mongoose = require('mongoose')
const Schema = mongoose.Schema

const imagesSchema = new Schema({
    image: {
        type: String
    },
}, { timeseries: true })

const Image = mongoose.model('image', imagesSchema)
module.exports = Image