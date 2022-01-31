const express=require('express')
const User  = require('../models/User')
const router=express.Router()
const CryptoJs=require('crypto-js')
const JWT=require('jsonwebtoken')
const { verifyTokenAndAdmin, verifyTokenAndAuthorization } = require('./verifyToken')


const secertKey="dad2442#1w!"
const jwtkey="dwawa#@w4333!@!"


router.post('/register',async (req,res)=>{
    req.body.password=CryptoJs.AES.encrypt(req.body.password,secertKey).toString()
    const newUser=new User(req.body)

    try{
        const savedUser=await newUser.save()
        console.log(savedUser);
        const accesToken=JWT.sign({
            id:savedUser.id,
            isAdmin:savedUser.isAdmin
        },jwtkey,{
            expiresIn:3000
        })
        const {password,...other}=savedUser._doc

        res.status(201).json({...other,accesToken})
    }
    catch(err){
        res.status(500).json(err)
    }
})

router.post('/login',async (req,res)=>{
    try{
        const user=await User.findOne({email:req.body.email})
        console.log(user);
        if(!user){
            res.status(401).json({error:'user or password not valid !!!'})
        }
        const hasehPassword=CryptoJs.AES.decrypt(user.password,secertKey)
        const passwordUser=hasehPassword.toString(CryptoJs.enc.Utf8)
        if(req.body.password != passwordUser){
            res.status(401).json({error:'user or password not valid !!!'})
        }
        const accesToken=JWT.sign({
            id:user.id,
            isAdmin:user.isAdmin
        },jwtkey,{
            expiresIn:3000
        })
        const {password,...other}=user._doc

        res.status(200).json({...other,accesToken})
        
    }
    catch(err){
        res.status(500).json(err)
    }
})

router.get('/checkpassword/:id/:currentpassword',verifyTokenAndAuthorization,async (req,res)=>{
    const id=req.params.id
    if(req.params.currentpassword&&id){
        try{
            const user=await User.findById(id)
        if(!user){
            res.status(401).json({error:'user or password not valid !!!'})
        }
            const hasehPassword=CryptoJs.AES.decrypt(user.password,secertKey)
            const currentpassword=hasehPassword.toString(CryptoJs.enc.Utf8)
            console.log(currentpassword,req.params.currentpassword);
            if(currentpassword!=req.params.currentpassword)res.status(401).json({error:'error recured'})
            res.status(200).json('ok')
        }
        catch(err){
            res.status(500).json(err)
        }
    }
    else{
        res.status(500).json({err:'url not valid !!!'})
    }
})



module.exports=router