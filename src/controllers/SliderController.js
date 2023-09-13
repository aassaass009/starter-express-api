const Slider = require('../models/slider')
const mongoose = require('mongoose')

module.exports.SliderImageById = async (req, res) => {
    let _id = new mongoose.Types.ObjectId(req.params.id)

    await Slider.findOne({ _id: _id }).then(e => {
        res.header('Access-Control-Allow-Origin', '*');
        return res.json(e)
    }).catch(err => {
        return res.json({ message: "Error" })
    })
}

module.exports.AllSliderImages = (req, res) => {
    Slider.find()
        .then(response => {
            res.json({
                response
            })
        })
        .catch(error => {
            res.json({
                message: 'An error Occured!'
            })
        })
}

module.exports.createSliderImage = async (req, res, next) => {
    let body = req.body

    let slider = new Slider({
        image: body.image,
        category_id: body.category_id,
    })
    slider.save()
        .then(response => {
            res.json({
                response
            })
        })
        .catch(error => {
            console.log(error)
            res.json({
                message: 'An error Occured!'
            })
        })
}

module.exports.UpdateSliderImage = async (req, res) => {
    const body = req.body
    let _id = new mongoose.Types.ObjectId(req.params.id)
    await Slider.findOneAndUpdate({ _id: _id }, body, { new: true }).then(e => {
        return res.status(200).json(e)
    }).catch(err => {
        return res.json({ message: "Error" })
    })
}

module.exports.DeleteSliderImage = async (req, res) => {
    let _id = new mongoose.Types.ObjectId(req.params.id)

    await Slider.deleteOne({ _id: _id }).then(e => {
        return res.status(200).json(e)
    }).catch(err => {
        return res.json({ message: "Error" })
    })
}