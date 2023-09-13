const Cart_items = require('../models/Cart_items')
const Product = require("../models/product")
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
require("dotenv").config();

module.exports.Create_cart_item = async (req, res) => {
    const body = req.body
    let id = "";

    if (!req.headers.authorization) {
        id = body.user_id
    } else {
        const usertoken = req.headers.authorization;
        const token = usertoken.split(' ');
        const decoded = jwt.verify(token[1], process.env.JWT_KEY);
        id = decoded.id;
    }

    const isNewCart = await Cart_items.isThisCart(body.product_id, id)
    if (!isNewCart) {
        return res.json({
            message: 'This product is already in cart'
        })
    }

    await add_cart_item(body, id).then(e => {
        return res.status(200).json(e)
    }).catch(err => {
        console.log('err', err)
        return res.status(401).json(err)
    })
}

const add_cart_item = async ({ product_id, quantity }, id) => {
    const newCart_item = new Cart_items({
        user_id: id,
        product_id,
        quantity
    })
    await newCart_item.save()
    return newCart_item
}

module.exports.Read_cart_item = async (req, res) => {
    const _id = new mongoose.Types.ObjectId(req.params.id);
    await Cart_items.findById(_id).then(e => {
        if (!e) {
            return res.status(404).json({ error: "cart item not found" })
        }
        return res.status(200).json(e)
    }).catch(err => {
        console.log(err.message)
        return res.status(401).json({ error: err.message })
    })
}

module.exports.Read_cart_items = async (req, res) => {
    const body = req.body
    let id = "";

    if (!req.headers.authorization) {
        id = body.user_id
    } else {
        const usertoken = req.headers.authorization;
        const token = usertoken.split(' ');
        const decoded = jwt.verify(token[1], process.env.JWT_KEY);
        id = decoded.id;
    }

    await Cart_items.find({ user_id: id }).then(e => {
        return res.status(200).json(e)
    }).catch(err => {
        console.log(err.message)
        return res.status(401).json({ error: err.message })
    })
}

module.exports.Delete_cart_item = async (req, res) => {
    const _id = new mongoose.Types.ObjectId(req.params.id)
    const oi = await Cart_items.findById(_id)
    if (!oi) {
        return res.status(404).json({ error: 'can\'t delete cart item not found' })
    }
    await Cart_items.findByIdAndDelete(_id).then(e => {
        return res.status(200).json(e)
    }).catch(err => {
        console.log(err.message)
        return res.status(401).json({ error: err.message })
    })
}

module.exports.Update_cart_item = async (req, res) => {
    const _id = new mongoose.Types.ObjectId(req.params.id)
    const cart_item = req.body
    const oi = await Cart_items.findById(_id)
    if (!oi) {
        return res.status(404).json({ error: 'can\'t update cart item not found' })
    }
    await Cart_items.findByIdAndUpdate(_id, cart_item, { new: true }).then(e => {
        return res.status(200).json(e)
    }).catch(err => {
        console.log(err.message)
        return res.status(401).json({ error: err.message })
    })
}

module.exports.add_one_quantity = async (req, res) => {
    const _id = new mongoose.Types.ObjectId(req.params.id)
    await Cart_items.findById(_id).then(async (e) => {
        if (!e) {
            return res.status(404).json({ error: 'can\'t update cart not found!' })
        } else {
            await Product.findById(e.product_id).then(async (product) => {
                await Cart_items.updateOne({ _id: _id, quantity: { $lt: product.quantity } }, { $inc: { quantity: 1 } }, { new: true }).then(e => {
                    return res.status(200).json(e)
                }).catch(err => {
                    console.log(err.message)
                    return res.status(401).json({ error: err.message })
                })
            })
        }
    })
}

module.exports.remove_one_quantity = async (req, res) => {
    const _id = new mongoose.Types.ObjectId(req.params.id)
    await Cart_items.findById(_id).then(e => {
        if (!e) {
            return res.status(404).json({ error: 'can\'t update cart not found!' })
        }
    })
    await Cart_items.updateOne({ _id: _id, quantity: { $gt: 1 } }, { $inc: { quantity: -1 } }, { new: true }).then(e => {
        res.status(200).json(e)
    }).catch(err => {
        console.log(err.message)
        res.status(401).json({ error: err.message })
    })
}