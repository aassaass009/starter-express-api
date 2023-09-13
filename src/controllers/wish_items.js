const Wish_items = require('../models/Wish_items')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
require("dotenv").config();

module.exports.Create_wish_item = async (req, res) => {
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

    const isNewWish = await Wish_items.isThisWish(body.product_id, id)
    if (!isNewWish) {
        return res.json({
            message: 'This product is already in wish'
        })
    }

    await add_wish_item(body, id).then(e => {
        return res.status(200).json(e)
    }).catch(err => {
        console.log('err', err)
        return res.status(401).json(err)
    })
}

const add_wish_item = async ({ product_id, quantity }, id) => {
    const newWish_item = new Wish_items({
        user_id: id,
        product_id,
        quantity
    })
    await newWish_item.save()
    return newWish_item
}

module.exports.Read_wish_item = async (req, res) => {
    const _id = new mongoose.Types.ObjectId(req.params.id);
    await Wish_items.findById(_id).then(e => {
        if (!e) {
            return res.status(404).json({ error: "Wish item not found" })
        }
        return res.status(200).json(e)
    }).catch(err => {
        console.log(err.message)
        return res.status(401).json({ error: err.message })
    })
}

module.exports.Read_wish_items = async (req, res) => {
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

    await Wish_items.find({ user_id: id }).then(e => {
        return res.status(200).json(e)
    }).catch(err => {
        console.log(err.message)
        return res.status(401).json({ error: err.message })
    })
}

module.exports.Delete_wish_item = async (req, res) => {
    const _id = new mongoose.Types.ObjectId(req.params.id)
    const oi = await Wish_items.findById(_id)
    if (!oi) {
        return res.status(404).json({ error: 'can\'t delete wish item not found' })
    }
    await Wish_items.findByIdAndDelete(_id).then(e => {
        return res.status(200).json(e)
    }).catch(err => {
        console.log(err.message)
        return res.status(401).json({ error: err.message })
    })
}

module.exports.Update_wish_item = async (req, res) => {
    const _id = new mongoose.Types.ObjectId(req.params.id)
    const wish_item = req.body
    const oi = await Wish_items.findById(_id)
    if (!oi) {
        return res.status(404).json({ error: 'can\'t update wish item not found' })
    }
    await Wish_items.findByIdAndUpdate(_id, wish_item, { new: true }).then(e => {
        return res.status(200).json(e)
    }).catch(err => {
        console.log(err.message)
        return res.status(401).json({ error: err.message })
    })
}