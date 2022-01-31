
const express=require('express')
const router=express.Router()
const OrderList=require('../models/OrderList')


const { verifyToken ,verifyTokenAndAdmin ,verifyTokenAndAuthorization} = require('./verifyToken')

//CREATE

router.post('/:id',verifyTokenAndAuthorization,async (req,res,next)=>{
    console.log(req.body);
    const newOrderList=new OrderList(req.body)
    try{
        const order=await newOrderList.save() 
        res.status(200).json(order)
    }catch(err){
        res.status(500).json(err)
    }
})

//UPDATE

router.put('/:iduser',verifyToken,async (req,res,next)=>{
    try{
        const updatedOrderList=await OrderList.findOneAndUpdate({userid:req.params.iduser},
            {
              $addToSet: { 'products': req.body }
            },{new:true})
            
        res.status(200).json(updatedOrderList)
    }catch(err){
        console.log(err);
        res.status(500).json(err)
    }
})

router.put('/update/:iduser',verifyToken,async (req,res,next)=>{
    try{
        
        const updatedOrderList=await OrderList.findOneAndUpdate({userid:req.params.iduser},
            req.body,{new:true})

        res.status(200).json(updatedOrderList)
    }catch(err){
        console.log(err);
        res.status(500).json(err)
    }
})
//DELETE

router.delete('/:id',verifyTokenAndAuthorization,async (req,res,next)=>{
    try{
        await OrderList.findByIdAndDelete(req.params.id)
        res.status(200).json("OrderList has benn deleted succefuly")
    }catch(err){
        res.status(500).json(err)
    }
})

//GET ALL

router.get('/',verifyTokenAndAdmin,async (req,res,next)=>{
    try{
        const orders=await OrderList.find().populate('products.productid')
        res.status(200).json(orders)
    }catch(err){
        res.status(500).json(err)
    }    
})



router.get('/:id',verifyTokenAndAuthorization,async (req,res,next)=>{
    try{
    const order=await OrderList.findById(req.params.id)
    res.status(200).json(order)
    }catch(err){
        res.status(500).json(err)
    }
})

router.get('/getbyuser/:iduser',async (req,res,next)=>{
    try{
    const order=await OrderList.find({userid:req.params.iduser}).populate('products.productid','title').select('-_id')
    res.status(200).json(order)
    }catch(err){
        res.status(500).json(err)
    }
})
module.exports=router