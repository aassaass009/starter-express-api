const Images = require('../models/images')
const mongoose = require('mongoose')

module.exports.ImageById = async (req, res) => {
    let _id = new mongoose.Types.ObjectId(req.params.id)

    await Images.findOne({ _id: _id }).then(e => {
        res.header('Access-Control-Allow-Origin', '*');
        return res.json(e)
    }).catch(err => {
        return res.json({ message: "Error" })
    })
}

module.exports.AllImages = (req, res) => {
    Images.find()
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

module.exports.createImage = async (req, res, next) => {
    let body = req.body

    let images = new Images({
        image: body.image,
    })
    images.save()
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

module.exports.UpdateImage = async (req, res) => {
    const body = req.body
    let _id = new mongoose.Types.ObjectId(req.params.id)
    await Images.findOneAndUpdate({ _id: _id }, body, { new: true }).then(e => {
        return res.status(200).json(e)
    }).catch(err => {
        return res.json({ message: "Error" })
    })
}

module.exports.DeleteImage = async (req, res) => {
    let _id = new mongoose.Types.ObjectId(req.params.id)

    await Images.deleteOne({ _id: _id }).then(e => {
        return res.status(200).json(e)
    }).catch(err => {
        return res.json({ message: "Error" })
    })
}