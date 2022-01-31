const Offer=require('../models/Offer')
const express=require('express')
const router=express.Router()
const { verifyToken ,verifyTokenAndAdmin ,verifyTokenAndAuthorization} = require('../Controllers/verifyToken')



router.post('/',verifyTokenAndAdmin,async (req,res)=>{
    
        const newOffer=new Offer(req.body)
     try{   
        const offer=await newOffer.save()
        console.log(offer);
        
        res.status(200).json(offer)
    }catch(err){
        res.status(500).json(err)
    }
})

router.put('/:id',verifyTokenAndAdmin,async (req,res,next)=>{
    try{
        const offer=await Offer.findByIdAndUpdate(req.params.id,req.body,{new:true})
        res.status(200).json(offer)
    }catch(err){
        res.status(500).json(err)
    }
})
router.delete('/:id',verifyTokenAndAdmin,async (req,res,next)=>{
    try{
        const offer=await Offer.findByIdAndDelete(req.params.id)
        res.status(200).json(offer)
    }catch(err){
        res.status(500).json(err)
    }
})
router.get('/',async (req,res,next)=>{
    try{

      const offers=await Offer.find()
        console.log(offers);
      if(!offers) res.status(500).json("offers not found !!!")
        res.status(200).json(offers)
    }catch(err){
        res.status(500).json(err)
    }
})


router.get('/:id',verifyTokenAndAuthorization,async (req,res,next)=>{
    try{
    const offer=await Offer.findById(req.params.id)

    res.status(200).json(offer)
    }catch(err){
        res.status(500).json(err)
    }
})
module.exports=router