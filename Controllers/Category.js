const Category=require('../models/Category')
const express=require('express')
const router=express.Router()
const { verifyToken ,verifyTokenAndAdmin ,verifyTokenAndAuthorization} = require('../Controllers/verifyToken')



router.post('/',verifyTokenAndAdmin,async (req,res)=>{
    
        const newCategory=new Category(req.body)
     try{   
        const category=await newCategory.save()
        
        res.status(200).json(category)
    }catch(err){
        res.status(500).json(err)
    }
})

router.put('/:id',verifyTokenAndAdmin,async (req,res,next)=>{
    try{
        const category=await Category.findByIdAndUpdate(req.params.id,req.body,{new:true})
        res.status(200).json(category)
    }catch(err){
        res.status(500).json(err)
    }
})
router.delete('/:id',verifyTokenAndAdmin,async (req,res,next)=>{
    try{
        const category=await Category.findByIdAndDelete(req.params.id)
        res.status(200).json(category)
    }catch(err){
        res.status(500).json(err)
    }
})
router.get('/all',verifyTokenAndAdmin,async (req,res)=>{
    try{
        const categories=await Category.find().select('-childsId -path -imgbanner -parent')
        if(!categories)res.status(500).json('Categories Not Found !!!')
        res.status(200).json(categories)

    }catch(err){
        res.status(500).json(err)
    }
})
router.get('/',async (req,res,next)=>{
    const query=req.query.parent
    try{
    let categories;
      if(req.query.parent){
        categories=await Category.find({parent:req.query.parent}).populate({ 
            path: 'childsId',
            populate: {
              path: 'childsId'
            } 
         })
      }
      else if(req.query.name){
        categories=await Category.find({name:req.query.name}).populate({ 
            path: 'childsId',
            populate: {
              path: 'childsId'
            } 
         })
      }
      else{
        categories=await Category.find({parent:null}).populate({ 
            path: 'childsId',
            populate: {
              path: 'childsId'
            } 
         })
      }
        if(!categories) res.status(500).json("categorys not found !!!")
        res.status(200).json(categories)
    }catch(err){
        res.status(500).json(err)
    }
})


router.get('/:id',verifyTokenAndAuthorization,async (req,res,next)=>{
    try{
    const category=await Category.findById(req.params.id)
    const {password,...others}=category._doc
    res.status(200).json(others)
    }catch(err){
        res.status(500).json(err)
    }
})
module.exports=router