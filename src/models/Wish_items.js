const { Schema, model,ObjectIdSchemaDefinition:ObjectId  } = require('mongoose')

const Wish_items_Schema = new Schema({
    user_id :{
        type:String,
    },
    product_id:{
        type:String,
    },
},{timestamps:true})

Wish_items_Schema.statics.isThisWish = async function (product_id, user_id) {
    if(!product_id) throw new Error('Invalid product_id')
    try{
        const product = await this.findOne({product_id: product_id, user_id: user_id})
        if(product) return false
    
        return true
    }catch (error){
        console.log('error inside isThiswish method ', error.message)
        return false
    }
}
  
module.exports = model.Wish_items || model("Wish_items", Wish_items_Schema);
