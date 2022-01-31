const mongoose=require('mongoose')


const offerschema=new mongoose.Schema({
    path:{type:String,required:true},
    title:{type:String,required:true}
})

const Offer=mongoose.model('Offer',offerschema)

module.exports=Offer