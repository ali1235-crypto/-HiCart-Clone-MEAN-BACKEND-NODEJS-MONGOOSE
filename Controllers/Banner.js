const Banner=require('../models/Banner')
const express=require('express')
const router=express.Router()
const { verifyToken ,verifyTokenAndAdmin ,verifyTokenAndAuthorization} = require('../Controllers/verifyToken')



router.post('/',verifyTokenAndAdmin,async (req,res)=>{
    
        const newBanner=new Banner(req.body)
     try{   
        const banner=await newBanner.save()
        
        res.status(200).json(banner)
    }catch(err){
        res.status(500).json(err)
    }
})

router.put('/:id',verifyTokenAndAdmin,async (req,res,next)=>{
    try{
        const banner=await Banner.findByIdAndUpdate(req.params.id,req.body,{new:true})
        res.status(200).json(banner)
    }catch(err){
        res.status(500).json(err)
    }
})
router.delete('/:id',verifyTokenAndAdmin,async (req,res,next)=>{
    try{
        const banner=await Banner.findByIdAndDelete(req.params.id)
        res.status(200).json(banner)
    }catch(err){
        res.status(500).json(err)
    }
})
router.get('/',async (req,res,next)=>{

    try{
      banners=await Banner.find()

        if(!banners) res.status(500).json("banners not found !!!")
        res.status(200).json(banners)
    }catch(err){
        res.status(500).json(err)
    }
})


router.get('/:id',verifyTokenAndAuthorization,async (req,res,next)=>{
    try{
    const banner=await Banner.findById(req.params.id)
    res.status(200).json(others)
    }catch(err){
        res.status(500).json(err)
    }
})
module.exports=router