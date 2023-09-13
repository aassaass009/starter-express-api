const mongoose = require('mongoose')
const Schema = mongoose.Schema

const FeaturedBrandsSchema = new Schema({
    image: {
        type: String
    },
    category_id: {
        type: String,
    }
}, { timeseries: true })

const FeaturedBrands = mongoose.model('featured_brand', FeaturedBrandsSchema)
module.exports = FeaturedBrands