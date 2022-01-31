const express=require('express')
const app=express()
const userc=require('./Controllers/User')
const productc=require('./Controllers/Product')
const mongoose=require('mongoose')
const authRoute=require('./Controllers/auth')
const categoryc=require('./Controllers/Category')
const wishlistc=require('./Controllers/WishList')
const cartlistc=require('./Controllers/CartList')
const comparelistc=require('./Controllers/CompareList')
const bannerc=require('./Controllers/Banner')
const offerc=require('./Controllers/Offer')
const cors=require('cors')

const orderlistc = require("./Controllers/OrderList");

app.use(cors({
  origin:"*"
  
}));


app.use(express.json())




app.use('/api/auth',authRoute)
app.use('/api/users',userc)
app.use('/api/products',productc)
app.use('/api/categories',categoryc)
app.use('/api/wishlists',wishlistc)
app.use('/api/cartlists',cartlistc)
app.use('/api/comparelists',comparelistc)
app.use('/api/offers',offerc)
app.use('/api/banners',bannerc)
app.use('/api/orderlists',orderlistc)

mongoose.connect('mongodb://localhost/shop')
.then(()=>console.log('Ok'))
.catch(()=>console.log('Fail !'))





app.listen(3000)