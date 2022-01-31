
const mongoose=require('mongoose')


const googleschema=new mongoose.Schema({
    firstname:{type:String,required:true},
    lastname:{type:String,required:true},
    email:{type:String,unique:true,required:true},
    dateofbirth:{type:Date,required:true,default:'2020-01-01'},
    mobilenumber:{type:Number,require:true,default:11111111},
    emsubscribe:{type:Boolean,default:false},
    isAdmin:{type:Boolean,default:false}
},{
    timestamps:true
})

const Google=mongoose.model('Google',googleschema)

module.exports=Google