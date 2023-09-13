const { Schema, model,ObjectIdSchemaDefinition:ObjectId  } = require('mongoose')

const Cart_items_Schema = new Schema({
    user_id :{
        type:String,
    },
    product_id:{
        type:String,
    },
    quantity:{
        type:Number,
    }
},{timestamps:true})

Cart_items_Schema.statics.isThisCart = async function (product_id, user_id) {
    if(!product_id) throw new Error('Invalid product_id')
    try{
        const product = await this.findOne({product_id: product_id, user_id: user_id})
        if(product) return false
    
        return true
    }catch (error){
        console.log('error inside isThiscart method ', error.message)
        return false
    }
}
  
module.exports = model.Cart_items || model("Cart_items", Cart_items_Schema);
