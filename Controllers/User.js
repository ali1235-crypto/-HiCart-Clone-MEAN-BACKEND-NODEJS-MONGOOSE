const User=require('../models/User')
const express=require('express')
const router=express.Router()
const { verifyToken ,verifyTokenAndAdmin ,verifyTokenAndAuthorization} = require('../Controllers/verifyToken')


router.post('/',verifyTokenAndAdmin,async (req,res,next)=>{
    const newUser=new User(req.body)
    try{
        const user=await newUser.save()
        const {password,...other}=user._doc
        res.status(200).json(other)
    }catch(err){
        res.status(500).json(err)
    }
})


router.put('/:id',verifyTokenAndAuthorization,async (req,res,next)=>{
    try{
        const user=await User.findByIdAndUpdate(req.params.id,req.body,{new:true})
        const {password,...other}=user._doc
        res.status(200).json(other)
    }catch(err){
        res.status(500).json(err)
    }
})
router.delete('/:id',verifyTokenAndAuthorization,async (req,res,next)=>{
    try{
        const user=await User.findByIdAndDelete(req.params.id)
        const {password,...other}=user._doc
        res.status(200).json(other)
    }catch(err){
        res.status(500).json(err)
    }
})
router.get('/',verifyTokenAndAdmin,async (req,res,next)=>{
    try{
        const users=await User.find()
        
        if(!users) res.status(500).json("users not found !!!")
        
        res.status(200).json(users)
    }catch(err){
        res.status(500).json(err)
    }
})
router.get('/:id',async (req,res,next)=>{
    try{
        const user=await User.findById(req.params.id)
        if(!user) res.status(500).json("users not found !!!")
        const {password,...other}=user._doc
        res.status(200).json(other)
    }catch(err){
        res.status(500).json(err)
    }
})
//GET USER STATS
router.get('/stats',verifyTokenAndAdmin,async (req,res,next)=>{
    const date=new Date()
    const lastYear=new Date(date.setFullYear(date.getFullYear()-1))

    try{
        const data=await User.aggregate([{$match:{createdAt:{$gte:lastYear}}},
            {$project:{month:{$month:"$createdAt"}}},
            {$group:{_id:"$month",total:{$sum:1}}}
        ])
        res.status(200).json(data)
    }catch(err){
        res.status(500).json(err)
    }
})
//GET ADDRESS
router.get('/address/:id',async (req,res)=>{
    try{
        const user=await User.findById(req.params.id)
        res.status(200).json(user.addresshipping)
    }catch(err){
        res.status(500).json(err)
    }
})

router.get('/:id',verifyTokenAndAuthorization,async (req,res,next)=>{
    try{
    const user=await User.findById(req.params.id)
    const {password,...others}=user._doc
    res.status(200).json(others)
    }catch(err){
        res.status(500).json(err)
    }
})
module.exports=router