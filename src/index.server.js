const express = require ('express');
const env = require('dotenv');
const app = express();
const connectDB = require('./connection/Db');
const path = require('path');
//routes
const authRoutes = require('./routes/auth')
const AdminRoutes = require('./routes/admin/auth')
const categoryRoutes = require('./routes/category')
const productRoutes  =  require('./routes/product')
const cartRoutes =  require('./routes/cart')


env.config();
connectDB();
app.use(express.json());
app.use('/public',express.static(path.join(__dirname,'uploads')))
app.use('/api',authRoutes)
app.use('/api',AdminRoutes)
app.use('/api',categoryRoutes)
app.use('/api',productRoutes)
app.use('/api',cartRoutes)





app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
})
