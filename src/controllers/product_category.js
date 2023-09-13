const Product_category = require('../models/product_category.js')
const Product = require('../models/product.js')
const Cart = require('../models/Cart_items.js')
const Wish = require('../models/Wish_items.js')
const Slider = require('../models/slider.js')
const mongoose = require('mongoose')

module.exports.AllProduct_categorys = (req, res) => {
    Product_category.find()
        .then(response => {
            res.header('Access-Control-Allow-Origin', '*');
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

module.exports.CreateProduct_category = async (req, res, next) => {
    let body = req.body

    let product_category = new Product_category({
        name: body.name,
        image: body.image,
        desc: body.desc,
    })
    product_category.save()
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
module.exports.UpdateProduct_category = async (req, res) => {
    let _id = new mongoose.Types.ObjectId(req.params.id)
    const body = req.body
    await Product_category.findOneAndUpdate({ _id: _id }, body, { new: true }).then(e => {
        return res.status(200).json(e)
    }).catch(err => {
        return res.json({ message: "Error" })
    })
}

module.exports.DeleteProduct_category = async (req, res) => {
    let _id = new mongoose.Types.ObjectId(req.params.id)
    await Product.find({ category_id: _id }).then(async (products) => {
        for (var i = 0; i < products.length; i++) {
            await Cart.find({ product_id: products[i]._id }).then(async (carts) => {
                for (var j = 0; j < carts.length; j++) {
                    await Cart.findByIdAndDelete(carts[j]);
                }
            })
            await Wish.find({ product_id: products[i]._id }).then(async (wishs) => {
                for (var j = 0; j < wishs.length; j++) {
                    await Wish.findByIdAndDelete(wishs[j]._id);
                }
            })
            await Product.findByIdAndDelete(products[i]._id);
        }
        await Slider.find({ category_id: _id }).then(async (sliders) => {
            for (var i = 0; i < sliders.length; i++) {
                await Slider.findByIdAndDelete(sliders[i]._id);
            }
        });
    })
    await Product_category.deleteOne({ _id: _id }).then(e => {
        return res.status(200).json(e)
    }).catch(err => {
        return res.json({ message: "Error" })
    })
}

module.exports.getCategory = async (req, res) => {
    let _id = new mongoose.Types.ObjectId(req.params.id)
    Product.find()
    await Product_category.findOne({ _id: _id }).then(e => {
        res.header('Access-Control-Allow-Origin', '*');
        return res.json(e)
    }).catch(err => {
        return res.json({ message: "Error" })
    })
}