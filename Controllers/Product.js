
const express=require('express')
const router=express.Router()
const Product=require('../models/Product')


const { verifyToken ,verifyTokenAndAdmin ,verifyTokenAndAuthorization} = require('../Controllers/verifyToken')
const { isInteger, toInteger, indexOf } = require('lodash')


router.post('/',verifyTokenAndAdmin,async (req,res,next)=>{
    console.log(req.body);
    const newProduct=new Product(req.body)
    try{
        const product=await newProduct.save()
        res.status(200).json(product)
    }catch(err){
        res.status(500).json(err)
    }
})

router.put('/:id',verifyTokenAndAdmin,async (req,res,next)=>{
    try{
        const updatedProduct=await Product.findByIdAndUpdate(req.params.id,req.body,{new:true})
        res.status(200).json(updatedProduct)
    }catch(err){
        res.status(500).json(err)
    }
})
router.delete('/:id',verifyTokenAndAdmin,async (req,res,next)=>{
    try{
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json("Product has benn deleted succefuly")
    }catch(err){
        res.status(500).json(err)
    }
})
router.get('/',async (req,res,next)=>{
    const category=req.query.category
    const perpage=parseInt(req.query.limit) || 20
    const page=req.query.page || 1
    const fieldname=req.query.fieldname || 'price'
    const sort=parseInt(req.query.sort) || 1

    let totalProductsLen;
   // const page=parseInt(req.body.)
    try{
        
        let products,brand,capacity,type,categories

        if(category){
            products=await Product.aggregate(
                
                    [{$lookup:{
                        from:"categories",
                        localField:"category",
                        foreignField:"_id",
                        as:"category"
                    }},
                    {
                        $match:{
                            
                            $or:[
                                    {'category.name':category},{'category.parent':category}
                                    ]

                    }
                    },
                    {$sort:{[fieldname]:sort}},
                    {$skip:perpage*(page-1)},
                    {$limit:perpage}
                ]
        
            )
            totalProductsLen=await Product.aggregate(
                
                [{$lookup:{
                    from:"categories",
                    localField:"category",
                    foreignField:"_id",
                    as:"category"
                }},
                {
                    $match:{$or:[
                        {'category.name':category},{'category.parent':category}
                    ]}
                },
                {$count:"totalProductsLen"}
            ]
    
        )
            brand=await Product.aggregate(
                [{$lookup:{
                    from:"categories",
                    localField:"category",
                    foreignField:"_id",
                    as:"category"
                }},
                {
                    $match:{$or:[
                        {'category.name':category},{'category.parent':category}
                    ]}
                },
                {$group:{_id:"$specification.brand",total:{$sum:1}}}
            ]
            )
            capacity=await Product.aggregate(
                [{$lookup:{
                    from:"categories",
                    localField:"category",
                    foreignField:"_id",
                    as:"category"
                }},
                {
                    $match:{$or:[
                        {'category.name':category},{'category.parent':category}
                    ]}
                },
                {$group:{_id:"$capacity",total:{$sum:1}}}
            ]
            )
            type=await Product.aggregate(
                [{$lookup:{
                    from:"categories",
                    localField:"category",
                    foreignField:"_id",
                    as:"category"
                }},
                {
                    $match:{$or:[
                        {'category.name':category},{'category.parent':category}
                    ]}
                },
                {$group:{_id:"$type",total:{$sum:1}}}
            ]
            ) 
            categories=await Product.aggregate(
                [{$lookup:{
                    from:"categories",
                    localField:"category",
                    foreignField:"_id",
                    as:"category"
                }},
                {
                    $match:{$or:[
                        {'category.name':category},{'category.parent':category}
                    ]}
                },
                {$group:{_id:"$category.name",total:{$sum:1}}}
            ]
            ) 
        }
              
            
        else{
            products=await Product.find()
            totalProductsLen=await Product.aggregate([
                {$count:"totalProductsLen"}
            ])
        }
        if(!products) res.status(500).json("products not found !!!")
        res.status(200).json({products,filter:[categories,brand,capacity,type],total:totalProductsLen})
    }catch(err){
        res.status(500).json(err)
    }
})

router.get('/filter',async (req,res)=>{
    try{
        const filtername=req.query.filtername
        const filtervalue=req.query.filtervalue
        if(filtername&&filtervalue){
        const products=await Product.find({[filtername]:filtervalue})
        if(!products)res.status(500).json('Products Not Found !!1')
        res.status(200).json(products)
    }
    }catch(err){
        res.status(500).json(err)
    }
})
router.get('/search',async (req,res)=>{
    try{
        console.log(req.query.search);
        const products=await Product.aggregate(
                
            [{$lookup:{
                from:"categories",
                localField:"category",
                foreignField:"_id",
                as:"category"
            }},
            {
                $match:{$or:[
                    {title:{ $regex: new RegExp(req.query.search,"i")}},
                    {'category.name':{ $regex: new RegExp(req.query.search,"i")}}
                ]}
            },
            {$limit:12}
        ]

    )
        if(products)res.status(200).json(products)
        res.status(500).json({err:'Not Products Found !!!'})
    }catch(err){
        res.status(500).json(err)
    }
})

router.get('/:id',async (req,res,next)=>{
    try{
    const product=await Product.findById(req.params.id)
    res.status(200).json(product)
    }catch(err){
        res.status(500).json(err)
    }
})
module.exports=router