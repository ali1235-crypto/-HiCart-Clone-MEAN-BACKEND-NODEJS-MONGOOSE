const { ObjectId } = require('bson')
const mongoose=require('mongoose')


const userschema=new mongoose.Schema({
    firstname:{type:String,required:true},
    lastname:{type:String,required:true},
    email:{type:String,unique:true,required:true},
    password:{type:String,required:true},
    gender:{type:String,required:true},
    dateofbirth:{type:Date,required:true},
    mobilenumber:{type:Number,require:true},
    emsubscribe:{type:Boolean,default:false},
    type:{type:String,default:'Email'},
    isAdmin:{type:Boolean,default:false},
    addresscontact:{
        firstname:{type:String},
        lastname:{type:String},
        company:{type:String},
        telephone:{type:String},
        fax:{type:String}
    },
    addresshipping:{
        streetnameno:{type:String},
        stateprovince:{type:String},
        city:{type:String},
        zip:{type:String},
        country:{type:String},
        addressnickname:{type:String}
    }     
},{
    timestamps:true
})

const User=mongoose.model('User',userschema)

module.exports=User