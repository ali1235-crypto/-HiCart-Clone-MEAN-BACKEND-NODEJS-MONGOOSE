const { ObjectId } = require('bson')
const mongoose=require('mongoose')


const categoryschema=new mongoose.Schema({
    name:{type:String,required:true},
    path:{type:String,required:true},
    parent:{type:String},
    imglogo:{type:String},
    imgbanner:{type:String},
    childsId:{type:[ObjectId],ref:"Category"}
},{
    timestamps:true
})

const Category=mongoose.model('Category',categoryschema)

module.exports=Category