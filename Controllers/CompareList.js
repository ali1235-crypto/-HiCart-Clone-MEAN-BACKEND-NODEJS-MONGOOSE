
const express=require('express')
const router=express.Router()
const CompareList=require('../models/CompareList')


const { verifyToken ,verifyTokenAndAdmin ,verifyTokenAndAuthorization} = require('../Controllers/verifyToken')

//CREATE

router.post('/',async (req,res,next)=>{
    const newCompareList=new CompareList(req.body)
    try{
        const compare=await newCompareList.save() 
        res.status(200).json(compare)
    }catch(err){
        res.status(500).json(err)
    }
})

//UPDATE

router.put('/:iduser',verifyToken,async (req,res,next)=>{
    try{
        const compare=CompareList.findOne(req.body)
        if(compare)res.status(404).json({err:'Product is Already Exist !'})
        const updatedCompareList=await CompareList.findOneAndUpdate({userid:req.params.iduser},
            {
              $addToSet: { 'products': req.body }
            },{new:true})
            
        res.status(200).json(updatedCompareList)
    }catch(err){
        console.log(err);
        res.status(500).json(err)
    }
})

router.put('/update/:iduser',verifyToken,async (req,res,next)=>{
    try{
        const index=req.body.index
        index='products.'+index+".qty"
        const updatedCompareList=await CompareList.findOneAndUpdate({userid:req.params.iduser},
            {$set:{[index]:req.body.qty},$set:{[index]:req.body.comment}},{new:true})

        res.status(200).json(updatedCompareList)
    }catch(err){
        console.log(err);
        res.status(500).json(err)
    }
})
//DELETE

router.delete('/:id',verifyTokenAndAuthorization,async (req,res,next)=>{
    try{
        await CompareList.findByIdAndDelete(req.params.id)
        res.status(200).json("CompareList has benn deleted succefuly")
    }catch(err){
        res.status(500).json(err)
    }
})

//GET ALL

router.get('/',verifyTokenAndAdmin,async (req,res,next)=>{
    try{
        const compares=await CompareList.find()
        res.status(200).json(compares)
    }catch(err){
        res.status(500).json(err)
    }    
})

router.get('/:iduser/nbofcompares',verifyTokenAndAuthorization,async (req,res,next)=>{
    try{
        const compare=await CompareList.find({userid:req.params.iduser}).populate('products.productid','title price discount img availability specification.productcode').select('-_id -userid -__v')
        res.status(200).json(compare)
    }catch(err){
        res.status(500).json(err)
    }    
})
//GET USER CART

router.get('/:id',verifyTokenAndAuthorization,async (req,res,next)=>{
    try{
    const compare=await CompareList.findById(req.params.id)
    res.status(200).json(compare)
    }catch(err){
        res.status(500).json(err)
    }
})

router.get('/getbyuser/:iduser',verifyTokenAndAuthorization,async (req,res,next)=>{
    try{
    const compare=await CompareList.aggregate(
        [
            {$lookup:{
                from:"products",
                localField:"productsid",
                foreignField:"_id",
                as:"productsid"
            }},
            {
                $match:{'userid':{$in:req.params.userid}}
            }
        ]
    )
    res.status(200).json(compare)
    }catch(err){
        res.status(500).json(err)
    }
})
module.exports=router