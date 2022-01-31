const { ObjectId } = require('bson')
const mongoose=require('mongoose')


const productschema=new mongoose.Schema({
    title:{type:String,required:true},
    desc:{type:String,required:true},
    price:{type:Number,required:true},
    rate:{type:Number},
    img:{type:String,required:true},
    imgs:{type:[String],required:true},
    size:{type:String},
    soldby:{type:String,required:true},
    category:{type:ObjectId,ref:'Category'},
    availability:{type:Boolean,required:true},
    capacity:{type:String},
    type:{type:String,required:true},
    discount:{type:Number,default:0},
    delivery_fees:{type:String,required:true},
    specification:{
        productcode:{type:String,required:true},
        brand:{type:String,required:true},
        color:{type:String},
        dimensions:{type:String},
        features:{type:String},
        WARRANTY_VALIDITY:{type:String}
    }
})
const Product=mongoose.model('Product',productschema)

module.exports=Product