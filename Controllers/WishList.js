
const express=require('express')
const router=express.Router()
const WishList=require('../models/WishList')


const { verifyToken ,verifyTokenAndAdmin ,verifyTokenAndAuthorization} = require('./verifyToken')

//CREATE

router.post('/',async (req,res,next)=>{
    
    const newWishList=new WishList(req.body)
    try{
        const wish=await newWishList.save() 
        res.status(200).json(wish)
    }catch(err){
        res.status(500).json(err)
    }
})

//UPDATE

router.put('/:iduser',verifyToken,async (req,res,next)=>{
    try{
        const wish=WishList.findOne({'products.productid':req.body.productid})
        console.log(wish);
        if(wish)res.status(404).json({err:'Product is Already Exist !'})
        else{
            const updatedWishList=await WishList.findOneAndUpdate({userid:req.params.iduser},
                {
                  $addToSet: { 'products': req.body }
                },{new:true})
                res.status(200).json(updatedWishList)
        }
            
        
    }catch(err){
        console.log(err);
        res.status(500).json(err)
    }
})

router.put('/update/:iduser',verifyToken,async (req,res,next)=>{
    try{
        const index=req.body.index
        index='products.'+index+".qty"
        console.log(index);
        const updatedWishList=await WishList.findOneAndUpdate({userid:req.params.iduser},
            {$set:{[index]:req.body.qty},$set:{[index]:req.body.comment}},{new:true})

        res.status(200).json(updatedWishList)
    }catch(err){
        console.log(err);
        res.status(500).json(err)
    }
})
//DELETE

router.delete('/:id',verifyTokenAndAuthorization,async (req,res,next)=>{
    try{
        await WishList.findByIdAndDelete(req.params.id)
        res.status(200).json("WishList has benn deleted succefuly")
    }catch(err){
        res.status(500).json(err)
    }
})

//GET ALL

router.get('/',verifyTokenAndAdmin,async (req,res,next)=>{
    try{
        const wishs=await WishList.find()
        res.status(200).json(wishs)
    }catch(err){
        res.status(500).json(err)
    }    
})

router.get('/:iduser/nbofhearts',verifyTokenAndAuthorization,async (req,res,next)=>{
    try{
        const wish=await WishList.find({userid:req.params.iduser}).populate('products.productid','title price discount img availability specification.productcode').select('-_id -userid -__v')
        res.status(200).json(wish)
    }catch(err){
        res.status(500).json(err)
    }    
})
//GET USER CART

router.get('/:id',verifyTokenAndAuthorization,async (req,res,next)=>{
    try{
    const wish=await WishList.findById(req.params.id)
    res.status(200).json(wish)
    }catch(err){
        res.status(500).json(err)
    }
})

router.get('/getbyuser/:iduser',verifyTokenAndAuthorization,async (req,res,next)=>{
    try{
    const wish=await WishList.aggregate(
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
    res.status(200).json(wish)
    }catch(err){
        res.status(500).json(err)
    }
})
module.exports=router