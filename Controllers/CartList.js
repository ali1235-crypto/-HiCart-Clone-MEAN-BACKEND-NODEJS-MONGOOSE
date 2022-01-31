
const express=require('express')
const router=express.Router()
const CartList=require('../models/CartList')


const { verifyToken ,verifyTokenAndAdmin ,verifyTokenAndAuthorization} = require('../Controllers/verifyToken')

//CREATE

router.post('/',async (req,res,next)=>{
    const newCartList=new CartList(req.body)
    try{
        const cart=await newCartList.save() 
        res.status(200).json(cart)
    }catch(err){
        res.status(500).json(err)
    }
})

//UPDATE

router.put('/:iduser',verifyToken,async (req,res,next)=>{
    try{console.log(req.body);
        const cart=CartList.findOne(req.body)
        if(cart)res.status(404).json({err:'Product is Already Exist !'})
        const updatedCartList=await CartList.findOneAndUpdate({userid:req.params.iduser},
            {
              $addToSet: { products: req.body }
            },{new:true})
            
        res.status(200).json(updatedCartList)
    }catch(err){
        console.log(err);
        res.status(500).json(err)
    }
})

router.put('/update/:iduser',verifyToken,async (req,res,next)=>{
    try{
        var index=req.query.index
        index='products.'+index+".qty"
        console.log(index);
        const updatedCartList=await CartList.findOneAndUpdate({userid:req.params.iduser},
            {$set:{[index]:req.body.qty}},{new:true})

        res.status(200).json(updatedCartList)
    }catch(err){
        console.log(err);
        res.status(500).json(err)
    }
})
//DELETE

router.delete('/:iduser',verifyTokenAndAuthorization,async (req,res,next)=>{
    try{
        await CartList.findOneAndDelete({iduser:req.params.iduser})
        res.status(200).json("CartList has benn deleted succefuly")
    }catch(err){
        res.status(500).json(err)
    }
})

//GET ALL

router.get('/',verifyTokenAndAdmin,async (req,res,next)=>{
    try{
        const carts=await CartList.find()
        res.status(200).json(carts)
    }catch(err){
        res.status(500).json(err)
    }    
})

router.get('/:iduser/nbofcarts',verifyTokenAndAuthorization,async (req,res,next)=>{
    try{
        const cart=await CartList.find({userid:req.params.iduser}).populate('products.productid','title price discount img availability specification.productcode soldby').select('-_id -userid -__v')
        res.status(200).json(cart)
    }catch(err){
        res.status(500).json(err)
    }    
})
//GET USER CART

router.get('/:id',verifyTokenAndAuthorization,async (req,res,next)=>{
    try{
    const cart=await CartList.findById(req.params.id)
    res.status(200).json(cart)
    }catch(err){
        res.status(500).json(err)
    }
})


module.exports=router