const { ObjectId } = require('bson')
const mongoose=require('mongoose')


const orderschema=new mongoose.Schema({
    userid:{
        type:ObjectId,ref:'User'
    },
    products:[{
        productid:{
            type:ObjectId,ref:'Product'
        },
        qty:{
            type:Number,
            default:1
        }
    }
    ],
    amount:{type:Number,required:true},
    address:{
        addressnickname:{type:String,required:true},
        stateprovince:{type:String,required:true},
        streetnameno:{type:String,required:true},
        city:{type:String,required:true},
        country:{type:String,required:true},
        zip:{type:String,required:true}
    },
    status:{type:String,default:'pending'}
})

const Order=mongoose.model('Order',orderschema)

module.exports=Order