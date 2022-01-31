const { ObjectId } = require('bson')
const mongoose=require('mongoose')


const cartschema=new mongoose.Schema({
    userid:{
        type:ObjectId,ref:'User',unique:true
    },
    products:[{
        productid:{type:ObjectId,ref:'Product'},
        qty:{type:Number,default:1}
    }]
})

const CartList=mongoose.model('CartList',cartschema)

module.exports=CartList