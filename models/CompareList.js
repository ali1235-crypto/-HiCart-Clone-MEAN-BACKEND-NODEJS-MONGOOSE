const { ObjectId } = require('bson')
const mongoose=require('mongoose')


const compareschema=new mongoose.Schema({
    userid:{
        type:ObjectId,ref:'User',unique:true
    },
    products:[{
        productid:{type:ObjectId,ref:'Product'},
        qty:{type:Number,default:1}
    }]
})

const CompareList=mongoose.model('CompareList',compareschema)

module.exports=CompareList