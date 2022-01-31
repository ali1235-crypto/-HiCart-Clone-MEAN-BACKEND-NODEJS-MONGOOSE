const { ObjectId } = require('bson')
const mongoose=require('mongoose')


const wishlistschema=new mongoose.Schema({
    userid:{
        type:ObjectId,ref:'User',unique:true
    },
    products:[{
        productid:{type:ObjectId,ref:'Product',default:undefined},
        comment:{type:String,default:'PLEAZE ENTER YOUR COMMENTS...'},
        qty:{type:Number,default:1}
    }]
})

const WishList=mongoose.model('WishList',wishlistschema)

module.exports=WishList