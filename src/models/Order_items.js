const { Schema, model, ObjectIdSchemaDefinition: ObjectId } = require('mongoose')

const order_items_Schema = new Schema({
    user_id: {
        type: String,
    },
    products: [
        {
            product_id: {
                type: String
            },
            name: {
                type: String
            },
            image: {
                type: String
            },
            price: {
                type: Number
            },
            SKU: { type: String },
            quantity: {
                type: String
            }
        }
    ],
    phone: {
        type: String,
    },
    country: {
        type: String,
    },
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    address: {
        type: String,
    },
    city: {
        type: String,
    },
    zipCode: {
        type: String,
    },
    payment: {
        type: String
    },
    totalPrice: {
        type: String
    },
    status: {
        type: String
    },
}, { timestamps: true })

module.exports = model.Cart_items || model("Order_items", order_items_Schema);
