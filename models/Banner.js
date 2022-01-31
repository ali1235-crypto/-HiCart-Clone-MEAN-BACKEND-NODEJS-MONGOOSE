const mongoose=require('mongoose')


const bannerschema=new mongoose.Schema({
    path:{type:String,required:true},
    title:{type:String,required:true}
})

const Banner=mongoose.model('Banner',bannerschema)

module.exports=Banner