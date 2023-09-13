const Order_items = require('../models/Order_items')
const Cart_items = require('../models/Cart_items')
const Product = require('../models/product.js')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
require("dotenv").config();

module.exports.Create_order_item = async (req, res) => {
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

    let list = [];

    console.log(id);

    for (var i = 0; i < body.products.length; i++) {
        console.log(body.products[i].product_id);
        await Product.findById(body.products[i].product_id).then(async (product) => {
            body.products[i].image = product.images[0]
            body.products[i].SKU = product.SKU
            body.products[i].name = product.name
            body.products[i].price = product.price_after

            await Product.findByIdAndUpdate(body.products[i].product_id, { $set: { quantity: product.quantity - body.products[i].quantity } }).then(async (product1) => {
                await Cart_items.findOneAndDelete({ product_id: body.products[i].product_id, user_id: id }).then(e => {
                    list.push("Done")
                })
            })
        })
    }

    if (list.length === body.products.length) {
        await add_order_item(body, id).then(e => {
            return res.status(200).json(e)
        }).catch(err => {
            console.log('err', err)
            return res.status(401).json(err)
        })
    }
}

const add_order_item = async (body, id) => {
    const newOrder_item = new Order_items({
        user_id: id,
        products: body.products,
        phone: body.phone,
        country: body.country,
        firstName: body.firstName,
        lastName: body.lastName,
        address: body.address,
        city: body.city,
        zipCode: body.zipCode,
        payment: body.payment,
        totalPrice: body.totalPrice,
        status: "Processing",
    })
    await newOrder_item.save()
    return newOrder_item
}

module.exports.Read_order_item = async (req, res) => {
    const _id = new mongoose.Types.ObjectId(req.params.id);
    await Order_items.findById(_id).then(e => {
        if (!e) {
            return res.status(404).json({ error: "order item not found" })
        }
        return res.status(200).json(e)
    }).catch(err => {
        console.log(err.message)
        return res.status(401).json({ error: err.message })
    })
}

module.exports.Read_order_items = async (req, res) => {
    await Order_items.find().then(e => {
        return res.status(200).json(e)
    }).catch(err => {
        console.log(err.message)
        return res.status(401).json({ error: err.message })
    })
}

module.exports.Delete_order_item = async (req, res) => {
    const _id = new mongoose.Types.ObjectId(req.params.id)
    const oi = await Order_items.findById(_id)
    if (!oi) {
        return res.status(404).json({ error: 'can\'t delete order item not found' })
    }
    await Order_items.findByIdAndDelete(_id).then(e => {
        return res.status(200).json(e)
    }).catch(err => {
        console.log(err.message)
        return res.status(401).json({ error: err.message })
    })
}

module.exports.Update_order_item = async (req, res) => {
    const _id = new mongoose.Types.ObjectId(req.params.id)
    const order_item = req.body
    const oi = await Order_items.findById(_id)
    if (!oi) {
        return res.status(404).json({ error: 'can\'t update order item not found' })
    }
    await Order_items.findByIdAndUpdate(_id, order_item, { new: true }).then(e => {
        return res.status(200).json(e)
    }).catch(err => {
        console.log(err.message)
        return res.status(401).json({ error: err.message })
    })
}